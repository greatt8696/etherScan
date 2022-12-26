import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Main = () => {
  const [transaction, setTransaction] = useState([]);
  const [logs, setLogs] = useState([]);

  const nav = useNavigate();
  const location = useParams();
  const params = useLocation();
  const searchType = !!params ? params?.state?.searchType : "blockHash";

  // const searchParams = new URLSearchParams(location);
  useEffect(() => {
    const apiType =
      searchType === "blockHash" ? "searchByblockHash" : "searchByHash";
    axios({
      url: `http://192.168.0.116:3000/transaction/${apiType}/${location.hash}/`,
      method: "get",
    }).then((response) => {
      setTransaction(response.data.data);

      axios({
        url: `http://192.168.0.116:3000/logs/searchByTransactionHash/${location.hash}/`,
        method: "get",
      }).then((response) => {
        setLogs(response.data.data);
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-2 introY">
      {transaction.map((block, idx) => (
        <div className="text-white p-5 bg-slate-600 introY" key={idx}>
          {Object.keys(block).map((label, idx) => (
            <div
              className="flex overflow-hidden introX"
              key={idx}
              style={{ animationDelay: `${idx * 20}ms` }}
            >
              <h1 className="mr-5">{label}</h1>
              <p>{block[label]}</p>
            </div>
          ))}

          {logs.map((log) => {
            return Object.keys(log).map((label, idx) => {
              // console.log(label)
              if (typeof log[label] === "object")
                return (
                  <div
                    key={idx}
                    className="introX"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <h1>{label}</h1>
                    {log[label].map((content, idx) => (
                      <div
                        className="ml-10 introX"
                        key={idx}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {Object.keys(content).map((label1, idx) => {
                          if (typeof content[label1] === "object")
                            return (
                              <div
                                key={idx}
                                className="introX"
                                style={{ animationDelay: `${idx * 100}ms` }}
                              >
                                <h1>{label1}</h1>
                                {Object.keys(content[label1]).map(
                                  (label11, idx) => {
                                    return (
                                      <div
                                        className="ml-10 introX"
                                        key={idx}
                                        style={{
                                          animationDelay: `${idx * 100}ms`,
                                        }}
                                      >
                                        {JSON.stringify(
                                          content[label1][label11]
                                        )}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            );
                          return <div>{JSON.stringify(content[label1])}</div>;
                        })}
                      </div>
                    ))}
                  </div>
                );
              return (
                <div className="flex overflow-ellipsis introX" key={idx}>
                  <h1 className="mr-5">{label}</h1>
                  <p>{JSON.stringify(log[label])}</p>
                </div>
              );
            });
          })}
        </div>
      ))}
    </div>
  );
};

export default Main;
