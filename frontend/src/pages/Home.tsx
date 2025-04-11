// import { Box, useMediaQuery, useTheme } from "@mui/material";
// import React from "react";
// import TypingAnim from "../components/typer/TypingAnim";
// import Footer from "../components/footer/Footer";

// const Home = () => {
//   const theme = useTheme();
//   const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//     <style>
//       {`
//         .main-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-top: 1.5rem;
//           width: 100%;
//         }
  
//         .images-container {
//           display: flex;
//           flex-direction: column;
//           gap: 1.25rem;
//           margin: 2.5rem 0;
//           width: 100%;
//         }
  
//         @media (min-width: 768px) {
//           .images-container {
//             flex-direction: row;
//           }
//         }
  
//         .image-robot,
//         .image-openai {
//           width: 200px;
//           margin: auto;
//         }
  
//         .chat-container {
//           display: flex;
//           margin: auto;
//         }
  
//         .image-chatbot {
//           display: flex;
//           margin: auto;
//           width: 60%;
//           border-radius: 20px;
//           box-shadow: -5px -5px 105px #64f3d5;
//           margin-top: 20px;
//           margin-bottom: 20px;
//           padding: 10px;
//         }
  
//         @media (max-width: 768px) {
//           .image-chatbot {
//             width: 80%;
//           }
//         }
//       `}
//     </style>
  
//     <div className="main-container">
//       <div>
//         {/* <TypingAnim /> */}
//       </div>
//       <div className="images-container">
//         <img
//           src="robot.png"
//           alt="robot"
//           className="image-robot"
//         />
//         <img
//           className="image-inverted rotate image-openai"
//           src="openai.png"
//           alt="openai"
//         />
//       </div>
//       <div className="chat-container">
//         <img
//           src="chat.png"
//           alt="chatbot"
//           className="image-chatbot"
//         />
//       </div>
//     </div>
//     <Footer />
//   </div>
  
//   );
// };

// export default Home;

import { Box, useMediaQuery, useTheme } from "@mui/material";
//import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center",  mt: isBelowMd ? 3 : 6, }}>
      <style>
        {`
          .images-container {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            margin: 2.5rem 0;
            width: 100%;
          }

          @media (min-width: 768px) {
            .images-container {
              flex-direction: row;
            }
          }

          .image-robot,
          .image-openai {
            width: 200px;
            margin: auto;
          }

          .chat-container {
            display: flex;
            margin: auto;
          }

          .image-chatbot {
            display: flex;
            margin: auto;
            width: 60%;
            border-radius: 20px;
            box-shadow: -5px -5px 105px #64f3d5;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 10px;
          }

          @media (max-width: 768px) {
            .image-chatbot {
              width: 80%;
            }
          }
        `}
      </style>

      <Box>
        {/* Uncomment if needed */}
         {/* <TypingAnim /> */} 
      </Box>

      <Box className="images-container">
        <img src="robot.png" alt="Robot" className="image-robot" />
        <img src="openai.png" alt="OpenAI Logo" className="image-openai" />
      </Box>

      <Box className="chat-container">
        <img src="chat.png" alt="Chatbot" className="image-chatbot" />
      </Box>

      <Footer />
    </Box>
  );
};

export default Home;
