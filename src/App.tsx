/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { mixFetch, SetupMixFetchOps } from "@nymproject/mix-fetch-full-fat";
import React from "react";

const mixFetchOptions: SetupMixFetchOps = {
  preferredGateway: "6Gb7ftQdKveMjPyrxDXeAtfYAX7Zg5mVZHtnRC5MmZ1B", // with WSS
  preferredNetworkRequester:
    "8rRGWy54oC8drFL9DepMegBt2DLrsqQwCoHMXt9nsnTo.2XjCPVbb4FpQ9hNRcXwb9mTzEAVVk1zf1tcch3wdtNEA@6Gb7ftQdKveMjPyrxDXeAtfYAX7Zg5mVZHtnRC5MmZ1B",
  mixFetchOverride: {
    requestTimeoutMs: 60_000,
  },
  forceTls: true, // force WSS
  extra: {},
};

export function HttpGET() {
  const [urls, setUrls] = React.useState([]);
  async function get() {
    // const response = await mixFetch(
    //   "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=20240617200906",
    //   { mode: "unsafe-ignore-cors" },
    //   mixFetchOptions
    // );

    const response = await fetch(
      "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=20240617200906"
    );

    const res = await response.json();
    console.log("response was", res);
    setUrls(res);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: 1200,
          gap: 10,
        }}
      >
        {urls.map((img: any, idx: number) => {
          return (
            <div key={idx}>
              <img src={img.url} width={280} />
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          get();
        }}
        style={{ backgroundColor: "green", fontSize: 20 }}
      >
        Get Cats!
      </button>
    </>
  );
}

export function HttpPOST() {
  async function post() {
    //Make sure the URL is whitelisted (see 'standard allowed list') otherwise you will get a network requester filter check error
    const apiResponse = await mixFetch(
      "https://httpbin.org/post",
      {
        method: "POST",
        body: JSON.stringify({ foo: "bar" }),
        headers: { "Content-Type": "application/json" },
      },
      mixFetchOptions
    );
    console.log(apiResponse);
  }
  return (
    <>
      <button
        onClick={() => {
          post();
        }}
      >
        Post
      </button>
    </>
  );
}

export default function App() {
  return (
    <>
      <HttpGET />
      {/* <HttpPOST /> */}
    </>
  );
}
