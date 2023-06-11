import { useContext, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import { AiOutlinePushpin, AiFillPushpin } from "react-icons/ai";
import { Context } from "../layout/Layout";
import swal from "sweetalert";
import axios from "axios";

const Blogs = () => {
  const baseurl = import.meta.env.VITE_SERVER_BASS_URL;
  const { user } = useContext(Context);

  const [pined, setPined] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseurl}/pinblog`, {
        headers: {
          auth: user?.email,
        },
      })
      .then((data) => {
        const res = data.data.result.blogs;
        setPined(res);
      });
  }, [user]);
  const data = [
    {
      id: 1,
      Question:
        "What is an access token and refresh token? How do they work and where should we store them on the client-side?",
      answer: [
        "1. Access Token: An access token is a credential that is used to access protected resources or perform actions on behalf of a user. It is typically short-lived and expires after a certain period of time. Access tokens are used to authorize and authenticate API requests. When a user logs in or authenticates with an application, the server issues an access token that contains information about the user's identity and permissions. This token is then sent along with subsequent API requests to prove the user's authorization.",
        "2. Refresh Token: A refresh token is a long-lived credential that is used to obtain a new access token when the current access token expires. Refresh tokens are usually associated with a specific user and are used to request a new access token without requiring the user to log in again. They provide a way to maintain the user's session and avoid asking for credentials repeatedly. When the access token expires, the client can send the refresh token to the server to obtain a new access token.",
        "Cookies: Access tokens and refresh tokens can be stored as HTTP-only secure cookies. This ensures that the tokens are automatically included with each request made by the browser, and they are not directly accessible by JavaScript code, reducing the risk of cross-site scripting (XSS) attacks. However, this approach requires careful handling of cookies to mitigate potential security risks.Local Storage or Session Storage: Tokens can also be stored in the browser's local storage or session storage. These storage mechanisms provide a simple way to persist data on the client-side. However, they are vulnerable to cross-site scripting attacks since JavaScript code can access the stored tokens. It's important to implement additional security measures like token encryption and strict input validation to mitigate these risks.IndexedDB or Web Storage: More advanced approaches involve using technologies like IndexedDB or Web Storage to store tokens securely. These provide a structured storage environment and can be encrypted to enhance security. However, implementing and managing these solutions can be more complex compared to the previous options . When choosing where to store access tokens and refresh tokens, it's important to consider the security requirements of your application. Always follow best practices and guidelines for token storage and transmission to minimize the risk of unauthorized access or token leakage.",
      ],
    },
    {
      id: 2,
      Question: "Compare SQL and NoSQL databases?",
      answer: [
        "SQL (Structured Query Language) and NoSQL (Not only SQL) are two types of database management systems with different approaches to data storage and retrieval. Here's a comparison between the two:",
        "1. Data Model: SQL: SQL databases use a structured data model based on tables with predefined schemas. Data is organized into rows and columns, and relationships between tables are established using keys.NoSQL: NoSQL databases use a variety of data models, such as key-value, document, columnar, or graph. They offer flexible schemas, allowing for dynamic and unstructured data storage.",
        "2. Query Language:SQL: SQL databases use SQL as a standardized query language for defining and manipulating relational data. SQL provides powerful querying capabilities with rich syntax and a wide range of operations.NoSQL: NoSQL databases often have their own query languages or APIs specific to the data model they support. These query languages may be less expressive than SQL but are optimized for specific use cases.",
      ],
    },
    {
      id: 3,
      Question: " What is express js? What is Nest JS?",
      answer: [
        "1. Express.js allows developers to handle HTTP requests and responses, define routes, and implement middleware for processing requests. It provides a set of features to handle common web development tasks, such as routing, templating, session management, and error handling. Express.js also supports the use of various third-party middleware and libraries, enabling developers to extend its functionality.",
        "2. NestJS, on the other hand, is a progressive Node.js framework for building efficient, scalable, and maintainable server-side applications. It is heavily inspired by Angular, a popular front-end framework, and adopts many of its concepts and design patterns. NestJS is built on top of Express.js, leveraging its features and extending them with additional capabilities.",
      ],
    },
    {
      id: 4,
      Question: " What is express js? What is Nest JS?",
      answer: [
        "MongoDB's aggregation framework is a powerful feature that allows you to perform advanced data processing operations on your MongoDB collections. It provides a flexible and efficient way to analyze, transform, and summarize data.The aggregation framework works by processing data through a pipeline of stages. Each stage performs a specific operation on the input data and passes the transformed data to the next stage. The pipeline can consist of one or more stages, and you can arrange the stages in any order to achieve the desired result.",
      ],
    },
  ];
  console.log(pined);
  const pinedHundler = (id) => {
    if (!user) {
      swal("Please Login Frist", "", "warning");
      return;
    }
    if (pined.includes(id)) {
      const data2 = pined.filter((Id) => Id !== id);
      setPined(data2);

      axios
        .post(`${baseurl}/pinblog`, {
          email: user.email,
          blog: data2,
        })
        .then((res) => {})
        .catch((er) => console.log(er));
      return;
    }
    const data3 = [...pined, id];
    axios
      .post(`${baseurl}/pinblog`, {
        email: user.email,
        blog: data3,
      })

      .then()
      .catch((er) => console.log(er));
    setPined(data3);
  };
  return (
    <Wrapper className={"mt-[120px] "}>
      <h3 className="text-center text-light text-3xl md:text-5xl font-bold font-head">
        Our Blogs
      </h3>
      <div className="relative">
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className=" mt-20 border p-2 rounded-md relative"
            >
              {pined?.includes(item.id) ? (
                <AiFillPushpin
                  onClick={() => {
                    pinedHundler(item.id);
                  }}
                  className=" absolute md:top-3 cursor-pointer right-5 text-xl md:text-3xl text-primery 
                  -top-[30px] "
                />
              ) : (
                <AiOutlinePushpin
                  onClick={() => {
                    pinedHundler(item.id);
                  }}
                  className=" absolute md:top-3 cursor-pointer right-5 text-xl md:text-3xl -top-[30px] "
                />
              )}

              <h3 className="text-xl md:text-2xl font-bold font-head underline  mb-5 text-light">
                {item.id}. {item.Question}
              </h3>
              <p>{item.answer}</p>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};
export default Blogs;
