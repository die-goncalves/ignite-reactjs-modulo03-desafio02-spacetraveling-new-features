import React, { useEffect, useState } from "react"

type MappingType =
  | 'pathname'
  | 'url'
  | 'title'
  | 'og:title'
  | 'issue-number'
  | 'issue-term'

type Theme =
  | 'github-light'
  | 'github-dark'
  | 'preferred-color-scheme'
  | 'github-dark-orange'
  | 'icy-dark'
  | 'dark-blue'
  | 'photon-dark'

interface ReactUtterancesProps {
  repo: string
  issueMap: MappingType
  issueTerm?: string
  issueNumber?: number
  label?: string
  theme: Theme
}

export default function ReactUtterances( props: ReactUtterancesProps){
  const [pending, setPending] = useState<boolean>(true);
  const utteranceBox = React.createRef<HTMLDivElement>();

  if (props.issueMap === 'issue-term' && props.issueTerm === undefined) {
    throw Error(
      "Property 'issueTerm' must be provided with issueMap 'issue-term'"
    )
  }
  if (props.issueMap === 'issue-term' && props.issueTerm === undefined) {
    throw Error(
      "Property 'issueTerm' must be provided with issueMap 'issue-term'"
    )
  }
  if (props.issueMap === 'issue-number' && props.issueNumber === undefined) {
    throw Error(
      "Property 'issueNumber' must be provided with issueMap 'issue-number'"
    )
  }
  
  useEffect(() => {
    const { repo, issueMap, issueTerm, issueNumber, label, theme } = props;
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://utteranc.es/client.js';
    scriptElement.async = true;
    scriptElement.defer = true;
    scriptElement.setAttribute('repo', repo);
    scriptElement.setAttribute('crossorigin', 'anonymous');
    scriptElement.setAttribute('theme', theme);
    scriptElement.onload = () => setPending(false);

    if (label) {
      scriptElement.setAttribute('label', label);
    }

    if (issueMap === 'issue-number') {
      scriptElement.setAttribute('issue-number', issueNumber.toString());
    } else if (issueMap === 'issue-term') {
      scriptElement.setAttribute('issue-term', issueTerm);
    } else {
      scriptElement.setAttribute('issue-term', issueMap);
    }

    if (utteranceBox && utteranceBox.current) {
      utteranceBox.current.appendChild(scriptElement)
    } else {
      throw Error(
        `Failed to add utterances comments on: ${utteranceBox}`
      )
    }

    const removeScript = () => {
      scriptElement.remove();
      document.querySelectorAll(".utterances").forEach(el => el.remove());
    };
    return () => {
      removeScript();
    };
  }, [props])
  
  return (
    <div ref={utteranceBox}>
      {pending && <p>Loading Comments...</p>}
    </div>
  )
}
