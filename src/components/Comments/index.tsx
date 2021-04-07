import React, { useEffect } from "react";

export default function Comments(){
  useEffect(() => {
    let script = document.createElement("script");
    let anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("repo", "die-goncalves/ignite-reactjs-modulo03-desafio02-spacetraveling-new-features");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", "dark-blue");
    script.setAttribute("crossorigin","anonymous");
    script.async = true;
    anchor.appendChild(script);
  }, []);

  return (
    <div id="inject-comments-for-uterances"></div>
  );
}
