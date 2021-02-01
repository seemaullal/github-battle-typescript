import { useState, useEffect, CSSProperties } from 'react';

const styles = {
  content: {
    fontSize: '35px',
    position: 'absolute',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center',
  } as CSSProperties,
};

function Loading({
  text = 'Loading',
  speed = 300,
}: {
  text?: string;
  speed?: number;
}) {
  const [content, setContent] = useState<string>(text);
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      content === text + '...'
        ? setContent(text)
        : setContent(currentContent => content + '.');
    }, speed);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [speed, text]);

  return <p style={styles.content}>{content}</p>;
}
