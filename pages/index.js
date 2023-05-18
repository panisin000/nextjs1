import { useEffect, useState } from "react";
import Image from "next/image";

export default function IndexPage() {
  const [inputName, setInputName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [list, setList] = useState([]);
  useEffect(() => {
    // console.log("After page show");
    loadList();
  }, []);
  //nav
  const loadList = () => {
    fetch("https://api.zenon.si/post")
      .then((response) => response.json())
      .then((data) => setList(data));
  };
  const tweet = () => {
    if (inputValue !== "" && inputName !== "") {
      setInputValue("");
      fetch("https://api.zenon.si/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ name: inputName, content: inputValue }),
      }).then(() => loadList());
    }
  };
  return (
    <div className="min-h-full bg-gray-100 flex items-start justify-center">
      {/* <div>
        <Image
          src={"/images/logo.jpg"}
          alt="This is a logo"
          width={200}
          height={200}
        />
      </div> */}
      <div className="w-1/2 flex flex-col items-end">
        {/* <div className="w-full mt-32 p-6 rounded-lg shadow"> */}
        <p className="w-full mt-32">Name</p>
        {/* </div> */}
        <div className="w-full mt-5 bg-white p-6 rounded-lg shadow">
          <input
            className="outline-none w-full resize-none"
            value={inputName}
            required
            onChange={(event) => {
              const value = event.target.value;
              setInputName(value);
            }}
          />
        </div>
        <form
          className="w-full mt-4"
          onSubmit={(event) => {
            event.preventDefault();
            tweet();
          }}
        >
          <p className="w-full mt-4">Text</p>
          <div className="w-full mt-8 bg-white p-6 rounded-lg shadow">
            <textarea
              required
              rows={8}
              className="outline-none w-full resize-none"
              value={inputValue}
              onChange={(event) => {
                const value = event.target.value;
                setInputValue(value);
              }}
            />

            {/* <input
              value={inputValue}
              required
              type="text"
              onChange={(event) => {
                const value = event.target.value;
                setInputValue(value);
              }}
            /> */}
          </div>
          <button
            // onClick={tweet}
            type="submit"
            className="mt-6 bg-gray-800 text-white font-bold px-8 py-4 rounded-lg shadow-lg"
          >
            Tweet
          </button>
          <button
            onClick={loadList}
            type="button"
            className="mt-6 bg-gray-600 text-white font-bold px-8 py-4 rounded-lg shadow-lg"
          >
            Refresh
          </button>
        </form>
        <div className="w-1/2 mt-8">
          {list.map((data) => {
            return (
              <div
                key={data.id}
                className=" bg-white mt-8 bg-ref-400 shadow-lg p-6 rounded-lg"
              >
                <h1 className="text-xl font-bold">{data.name}</h1>
                <div className="mt-2 text-gray-600 w-full">{data.content}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
