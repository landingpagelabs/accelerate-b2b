'use client';

import { useState } from 'react';

const MESSAGE = `Hey, I just booked a call with Accelerate B2B, a cold outreach agency. The founder works on every campaign himself and seems like they have some good results. Right now they’re running a free test campaign so you can see it work before paying anything. They’ve only got a few spots. Thought it might be of interest. Here’s all the info: www.accelerateb2b.com`;

export default function CongratsCopyMessage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(MESSAGE).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="text-body-regular white copy" onClick={copy} role="button" tabIndex={0}>
        {MESSAGE}
        <div className={`copy-alert${copied ? ' visible' : ''}`}>
          <p className="text-body-regular">Text Copied !</p>
        </div>
      </div>

      <div className="copy-cta" onClick={copy} role="button" tabIndex={0}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_copy)">
            <path
              d="M17.6266 2.72667L15.7232 0.760833C15.4895 0.520805 15.2101 0.329867 14.9016 0.199218C14.5931 0.0685687 14.2616 0.000838693 13.9266 0L9.9974 0C9.03723 0.0012121 8.10683 0.333408 7.36302 0.940598C6.61921 1.54779 6.10748 2.39284 5.91406 3.33333H5.83073C4.72607 3.33466 3.66703 3.77407 2.88591 4.55518C2.1048 5.3363 1.66539 6.39534 1.66406 7.5V15.8333C1.66539 16.938 2.1048 17.997 2.88591 18.7782C3.66703 19.5593 4.72607 19.9987 5.83073 20H10.8307C11.9354 19.9987 12.9944 19.5593 13.7755 18.7782C14.5567 17.997 14.9961 16.938 14.9974 15.8333V15.75C15.9379 15.5566 16.7829 15.0449 17.3901 14.301C17.9973 13.5572 18.3295 12.6268 18.3307 11.6667V4.46667C18.332 3.81701 18.0793 3.1926 17.6266 2.72667ZM10.8307 18.3333H5.83073C5.16769 18.3333 4.5318 18.0699 4.06296 17.6011C3.59412 17.1323 3.33073 16.4964 3.33073 15.8333V7.5C3.33073 6.83696 3.59412 6.20107 4.06296 5.73223C4.5318 5.26339 5.16769 5 5.83073 5V11.6667C5.83205 12.7713 6.27146 13.8304 7.05258 14.6115C7.83369 15.3926 8.89273 15.832 9.9974 15.8333H13.3307C13.3307 16.4964 13.0673 17.1323 12.5985 17.6011C12.1297 18.0699 11.4938 18.3333 10.8307 18.3333ZM14.1641 14.1667H9.9974C9.33436 14.1667 8.69847 13.9033 8.22963 13.4344C7.76079 12.9656 7.4974 12.3297 7.4974 11.6667V4.16667C7.4974 3.50363 7.76079 2.86774 8.22963 2.3989C8.69847 1.93006 9.33436 1.66667 9.9974 1.66667H13.3307V3.33333C13.3307 3.77536 13.5063 4.19928 13.8189 4.51184C14.1314 4.82441 14.5554 5 14.9974 5H16.6641V11.6667C16.6641 12.3297 16.4007 12.9656 15.9318 13.4344C15.463 13.9033 14.8271 14.1667 14.1641 14.1667Z"
              fill="#1A1A1A"
            />
          </g>
          <defs>
            <clipPath id="clip0_copy">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <p className="text-label-medium">Copy Message And Send</p>
      </div>
    </>
  );
}
