import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../context/AuthContext";

type ChatItemProps = {
  content: string;
  role: "user" | "assistant";
};

const ChatItem: React.FC<ChatItemProps> = ({ content, role }) => {
  const auth = useAuth();

  const userInitials = auth?.user?.name
    ? `${auth.user.name[0]}${auth.user.name.split(" ")[1]?.[0] || ""}`
    : "U";

  return (
    <div>
      <style>
        {`
          .chat-item {
            display: flex;
            padding: 16px;
            border-radius: 8px;
            gap: 16px;
            margin: 8px 0;
            align-items: center;
          }

          .chat-item.assistant {
            background-color: #004d5612;
          }

          .chat-item.user {
            background-color: #004d56;
          }

          .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: black;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-weight: bold;
            text-align: center;
          }

          .message-content .text {
            font-size: 20px;
            color: white;
          }

          .message-content {
            flex: 1;
          }
        `}
      </style>

      <div className={`chat-item ${role}`}>
        <div className="avatar">
          {role === "assistant" ? (
            <img src="openai.png" alt="OpenAI" width="30px" />
          ) : (
            <span>{userInitials}</span>
          )}
        </div>
        <div className="message-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={coldarkDark}
                    language={match[1]}
                    PreTag="div"
                    {...props} // Spread props here
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
