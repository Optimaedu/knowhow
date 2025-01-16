'use client'
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { useState, useCallback } from 'react';
import {darcula} from "@uiw/codemirror-theme-darcula";

export default function Home() {
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: string) => {
    setValue(e);
  }, []);

  async function testCode() {
    console.log(value);
    // const nums = [1, 2]

    const res = await fetch('http://37.27.6.76:2358/submissions?wait=true', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        language_id: 63, 
        source_code: value,
        expected_output: 3,
      }),
    })

    const data = await res.json();
    console.log(data);
  };

  

  return (
  <div className='h-screen w-full flex items-center flex-col gap-5 mt-20'>
      <CodeMirror 
      value={value} 
      height='15em' 
      width='30em'
      className='rounded-sm border-2 border-zinc-500'
      theme={darcula}
      extensions={[javascript({ jsx: true })]}
      onChange={handleChange} 
      />

      <button onClick={testCode} className='bg-zinc-400 text-zinc-900  border-2 border-zinc-500 px-3 rounded-sm'><b>Test</b></button>
    </div>
  );
}