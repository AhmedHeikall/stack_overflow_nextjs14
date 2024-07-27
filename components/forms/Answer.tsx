"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { AnswerSchema } from "@/lib/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/Themeprovider";
import { Button } from "../ui/button";

import { createAnswer } from "@/lib/actions/answer.action";

interface Props {
  authorId: string;
  questionId: string;
  question: string;
}

const Answer = ({ authorId, questionId, question }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const editorRef = useRef(null);
  const { mode } = useTheme();
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  // 2. Define a submit handler.
  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      // show a toast.
      toast({
        title: `Answer created successfully`,
        variant: "default",
        className: "bg-light-900 dark:bg-dark-300 text-dark300_light900",
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;

        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAI(true);

    try {
      /* const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        { method: "POST", body: JSON.stringify({ question }) }
      );

      const aiAnswer = await response.json();

      alert(aiAnswer.reply);
      conver plain text to HTMLformat
      const formattedAnswer = aiAnswer.reply.replace(/\n/g, "<br />");

        */
      const apologyMessage = `Dear User,

                            We apologize for any inconvenience caused by the unavailability of the [Generate AI answer] feature at this time. We would like to inform you that this feature is indeed present in the code, but it is currently inactive due to the need for a subscription fee in dollars to enable it.

                            We are working diligently to secure the necessary financial support and expect this feature to be available within a few days. We appreciate your understanding and continued support for our website.

                            Thank you for trying our site.

                            Best regards,
                            Ahmed Hesham Heikal
                            Dev OverFlow
                            
                            عزيزي المستخدم،

نعتذر عن أي إزعاج قد يكون تسبب به عدم توفر خاصية [تكوين اجابه باستخدام الذكاء الاصطناعي] في الوقت الحالي. نود إعلامك بأن هذه الخاصية موجودة بالفعل في الكود، ولكنها غير مفعلة في الوقت الراهن بسبب الحاجة إلى اشتراك بالدولار لتشغيلها.

نحن نعمل جاهدين على تأمين الدعم المالي اللازم، ونتوقع أن تكون هذه الخاصية متاحة في غضون أيام قليلة. نشكرك على تفهمك ودعمك المستمر لموقعنا.

شكرًا لتجربتك موقعنا.

مع خالص التحية،
[احمد هشام هيكل]
[Dev OverFlow]
                            `;

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent(apologyMessage.replace(/\n/g, "<br />"));
      }

      // Toast...
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmittingAI(false);
    }
  };

  return (
    <div>
      <div className="mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light900">
          Write your answer here.
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={generateAIAnswer}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Image
                src="/assets/icons/stars.svg"
                alt="star"
                width={12}
                height={12}
                className="object-contain"
              />
              Generate AI Answer
            </>
          )}
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          {/* Answer filed */}
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  {/* tiny editor */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "codesample",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample |bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter; font-size:16px }",
                      skin: mode === " dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
