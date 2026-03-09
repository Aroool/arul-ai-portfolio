"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: "easeOut",

    },
  }),
};

export default function HomePage() {
  const suggestedQuestions = [
    "Who is Arul?",
    "What projects has he built?",
    "What open-source work has he done?",
    "Why hire Arul?",
  ];

  const [input, setInput] = useState("");
  const [floatingInput, setFloatingInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);
  const [isMainChatVisible, setIsMainChatVisible] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m Arul’s AI. Ask me about his work, projects, skills, or open-source contributions.",
    },
  ]);

  const mainChatRef = useRef<HTMLDivElement | null>(null);
  const mainChatMessagesRef = useRef<HTMLDivElement | null>(null);
  const floatingChatMessagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainChatVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsFloatingOpen(false);
        }
      },
      {
        threshold: 0.35,
      }
    );

    if (mainChatRef.current) {
      observer.observe(mainChatRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mainChatMessagesRef.current) {
      mainChatMessagesRef.current.scrollTo({
        top: mainChatMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    if (floatingChatMessagesRef.current) {
      floatingChatMessagesRef.current.scrollTo({
        top: floatingChatMessagesRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, loading, isFloatingOpen]);

  const sendMessage = async (
    messageText?: string,
    source: "main" | "floating" = "main"
  ) => {
    const finalMessage =
      source === "floating"
        ? (messageText ?? floatingInput).trim()
        : (messageText ?? input).trim();

    if (!finalMessage || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: finalMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setFloatingInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: finalMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to get response");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleMainSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(undefined, "main");
  };

  const handleFloatingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(undefined, "floating");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="fixed inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.08),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(236,72,153,0.08),transparent_30%)]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute inset-0 backdrop-blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)]">
              ✦
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              Arul.dev
            </span>
          </Link>

          <nav className="hidden gap-8 md:flex">
            <Link
              href="/"
              className="text-sm text-white transition hover:text-fuchsia-300"
            >
              Home
            </Link>
            <Link
              href="/projects"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Projects
            </Link>
            <Link
              href="/opensource"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Open Source
            </Link>
            <Link
              href="/contact"
              className="text-sm text-white/75 transition hover:text-fuchsia-300"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto flex min-h-[calc(100vh-77px)] max-w-7xl flex-col items-center justify-center px-6 py-14 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            className="relative"
          >
            <motion.div
              custom={0}
              variants={fadeUp}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-fuchsia-500/80 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-[0_0_90px_rgba(168,85,247,0.35)]"
              >
                <div className="absolute inset-[6px] overflow-hidden rounded-full bg-black/40">
                  <Image
                    src="/profile.jpg"
                    alt="Arulprashath"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-1 -right-1 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-base font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.45)]"
              >
                ✦
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 text-5xl font-semibold tracking-tight md:text-7xl"
          >
            Arulprashath
          </motion.h1>

          <motion.p
            custom={0.2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-4 text-xl font-medium text-fuchsia-300 md:text-2xl"
          >
            Software Engineer · AI Builder · Open Source Contributor
          </motion.p>

          <motion.a
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            href="#main-chat"
            className="mt-5 inline-flex items-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-5 py-2 text-sm font-medium text-fuchsia-200 transition hover:scale-[1.02] hover:bg-fuchsia-500/15"
          >
            Talk to Arul AI →
          </motion.a>

          <motion.p
            custom={0.4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg"
          >
            I build intelligent software, developer tools, and AI-powered
            products with a strong focus on practical, real-world usability.
          </motion.p>

          <motion.div
            custom={0.5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-12 grid w-full max-w-5xl gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "AI Systems",
                desc: "LLM apps, RAG workflows, and smart user experiences.",
              },
              {
                title: "Projects",
                desc: "Full-stack and product-style builds focused on impact.",
              },
              {
                title: "Open Source",
                desc: "Public engineering proof through real contributions.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: "easeOut",
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/65">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            custom={0.7}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a
              href="#main-chat"
              className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.02]"
            >
              Ask Arul AI
            </a>

            <Link
              href="/projects"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              View Projects
            </Link>
          </motion.div>
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-white/40">
              AI Chat
            </p>
            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              Ask Arul AI
            </h2>
            <p className="mt-4 text-base leading-8 text-white/65">
              Explore Arul’s background, projects, skills, and public work.
            </p>
          </motion.div>

          <motion.div
            id="main-chat"
            ref={mainChatRef}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-violet-400/20 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-4 shadow-[0_0_60px_rgba(139,92,246,0.14)] backdrop-blur-2xl"
          >
            <div className="mb-4 flex items-center justify-between rounded-[1.5rem] bg-gradient-to-r from-fuchsia-500/18 via-violet-500/16 to-cyan-400/12 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-white shadow-[0_0_24px_rgba(168,85,247,0.28)]">
                  ✦
                </div>
                <div>
                  <p className="text-lg font-semibold">Arul&apos;s AI</p>
                  <p className="text-xs text-white/45">
                    Intelligent portfolio assistant
                  </p>
                </div>
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                Online
              </div>
            </div>

            <div
              ref={mainChatMessagesRef}
              className="mb-4 h-[360px] space-y-4 overflow-y-auto rounded-[1.5rem] bg-[#08111f] p-5"
            >
              {messages.map((message, index) => (
  <div
    key={index}
    className={
      message.role === "user"
        ? "ml-auto w-fit max-w-[75%] rounded-2xl border border-fuchsia-400/10 bg-gradient-to-br from-fuchsia-500/18 to-violet-500/14 px-5 py-3 text-sm leading-7 text-fuchsia-50 shadow-[0_0_20px_rgba(168,85,247,0.08)]"
        : "w-fit max-w-[70%] rounded-2xl border border-white/6 bg-[#0f1b2d] px-5 py-4 text-sm leading-7 text-white/85 backdrop-blur-xl"
    }
  >
    {message.content}
  </div>
))}

              {loading && (
                <div className="max-w-[90%] rounded-2xl border border-white/6 bg-white/[0.045] p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleMainSubmit} className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Arul..."
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-5 py-4 text-sm font-medium text-white shadow-[0_0_24px_rgba(168,85,247,0.24)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question, "main")}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      {!isMainChatVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {isFloatingOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mb-4 w-[340px] rounded-[1.5rem] border border-violet-400/20 bg-[linear-gradient(180deg,rgba(10,16,30,0.96),rgba(7,12,24,0.96))] p-4 shadow-[0_0_40px_rgba(139,92,246,0.22)] backdrop-blur-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-sm text-white">
                    ✦
                  </div>
                  <div>
                    <p className="font-semibold">Arul&apos;s AI</p>
                    <p className="text-[10px] text-white/45">
                      Intelligent portfolio assistant
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsFloatingOpen(false)}
                  className="text-sm text-white/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div
                ref={floatingChatMessagesRef}
                className="mb-3 h-[220px] space-y-3 overflow-y-auto rounded-2xl bg-[#08111f] p-3"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.role === "user"
                      ? "ml-auto w-fit max-w-[75%] rounded-2xl border border-fuchsia-400/10 bg-gradient-to-br from-fuchsia-500/18 to-violet-500/14 px-4 py-3 text-xs leading-6 text-fuchsia-50"
                      : "w-fit max-w-[70%] rounded-2xl border border-white/6 bg-[#0f1b2d] px-5 py-4 text-sm leading-7 text-white/85 backdrop-blur-xl"
                    }
                  >
                    {message.content}
                  </div>
                ))}

                {loading && (
                  <div className="max-w-[90%] rounded-2xl border border-white/6 bg-white/[0.045] p-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-white/60" />
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleFloatingSubmit} className="flex gap-2">
                <input
                  value={floatingInput}
                  onChange={(e) => setFloatingInput(e.target.value)}
                  placeholder="Ask about Arul..."
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-4 py-3 text-xs font-medium text-white disabled:opacity-60"
                >
                  Send
                </button>
              </form>
            </motion.div>
          )}

          <motion.button
            onClick={() => setIsFloatingOpen((prev) => !prev)}
            animate={{
              y: [0, -8, 0],
              boxShadow: [
                "0 0 20px rgba(217,70,239,0.25)",
                "0 0 36px rgba(217,70,239,0.45)",
                "0 0 20px rgba(217,70,239,0.25)",
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-xl text-white transition hover:scale-105"
          >
            ✦
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
