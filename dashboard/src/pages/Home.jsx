// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="container mx-auto px-6 py-12 max-w-5xl">
//       <h1 className="text-5xl font-extrabold text-center text-blue-600 mb-8 leading-tight">
//         Welcome to the Real-Time XAI-Powered IP Threat Detection and Prevention System
//       </h1>
//       <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
//         This platform is designed to protect your web applications from malicious IP addresses using advanced threat detection techniques and a next-generation firewall. Our system integrates explainable AI (XAI) for enhanced security decision-making, allowing real-time detection and blocking of suspicious IPs that may pose a threat to your online assets.
//       </p>

//       <div className="mt-12 bg-gradient-to-r from-blue-100 to-white p-8 rounded-xl shadow-lg">
//         <h2 className="text-4xl font-semibold text-gray-800 mb-6">How it Works</h2>
//         <p className="text-lg text-gray-600 leading-relaxed mb-4">
//           Our system continuously monitors incoming traffic to your web application and identifies potential threats based on their IP addresses. If an IP address is found to be malicious or is repeatedly engaging in suspicious activities, it will be automatically blocked using our firewall service.
//         </p>
//         <p className="text-lg text-gray-600 leading-relaxed">
//           The firewall is integrated with advanced threat detection techniques powered by Explainable AI, ensuring transparency and accurate security decision-making.
//         </p>
//       </div>

//       <div className="mt-12">
//         <h2 className="text-4xl font-semibold text-gray-800 mb-6">Key Features</h2>
//         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg text-gray-600">
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10V3m0 0H9m3-3h3m4 5a4 4 0 00-4-4H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V5z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-blue-600">Real-Time IP Threat Detection:</strong> Monitors and identifies malicious IP addresses in real-time.
//             </div>
//           </li>
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10V3m0 0H9m3-3h3m4 5a4 4 0 00-4-4H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V5z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-blue-600">Explainable AI (XAI):</strong> Provides transparency and insight into the decision-making process for blocking IPs.
//             </div>
//           </li>
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10V3m0 0H9m3-3h3m4 5a4 4 0 00-4-4H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V5z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-blue-600">Next-Generation Firewall:</strong> Blocks harmful IP addresses from accessing your web app.
//             </div>
//           </li>
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10V3m0 0H9m3-3h3m4 5a4 4 0 00-4-4H6a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V5z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-blue-600">Easy Integration:</strong> Simple SDK for integrating our firewall service into your existing web application.
//             </div>
//           </li>
//         </ul>
//       </div>

//       <div className="mt-12 text-center">
//         <a
//           href="/sdk-setup"
//           className="text-xl text-blue-600 hover:text-blue-700 underline transition-all duration-300 font-semibold"
//         >
//           Learn how to integrate the firewall SDK into your web app
//         </a>
//       </div>
//     </div>
//   );
// };

// export default HomePage;

// import React from "react";

// const HomePage = () => {
//   return (
//     <div className="container mx-auto px-6 py-12 max-w-5xl">
//       {/* Hero Section */}
//       <header className="text-center mb-12">
//         <h1 className="text-5xl font-extrabold text-green-400 mb-4 leading-tight animate-fadeIn">
//           Welcome to the Real-Time XAI-Powered IP Threat Detection and Prevention System
//         </h1>
//         <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
//           Protect your web applications from malicious IP addresses using advanced threat detection and a next-generation firewall. Our platform integrates Explainable AI (XAI) for enhanced security decision-making, enabling real-time detection and blocking of suspicious IPs.
//         </p>
//       </header>

//       {/* How It Works Section */}
//       <section className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg">
//         <h2 className="text-4xl font-semibold text-gray-100 mb-6">How it Works</h2>
//         <p className="text-lg text-gray-300 leading-relaxed mb-4">
//           Our system continuously monitors incoming traffic to your web application and identifies potential threats based on their IP addresses. If an IP address is found to be malicious or repeatedly engages in suspicious activities, it is automatically blocked using our robust firewall service.
//         </p>
//         <p className="text-lg text-gray-300 leading-relaxed">
//           Integrated with advanced threat detection techniques powered by Explainable AI, our solution ensures transparency and accurate security decision-making.
//         </p>
//       </section>

//       {/* Key Features Section */}
//       <section className="mt-12">
//         <h2 className="text-4xl font-semibold text-gray-100 mb-6">Key Features</h2>
//         <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg text-gray-300">
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-10 h-10 text-green-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-green-400">Real-Time IP Threat Detection:</strong> Instantly monitors and identifies malicious IP addresses.
//             </div>
//           </li>
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-10 h-10 text-green-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-green-400">Explainable AI (XAI):</strong> Offers transparency into the decision-making process for blocking IPs.
//             </div>
//           </li>
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-10 h-10 text-green-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-green-400">Next-Generation Firewall:</strong> Prevents harmful IPs from accessing your web applications.
//             </div>
//           </li>
//           <li className="flex items-start space-x-4">
//             <div className="flex-shrink-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-10 h-10 text-green-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
//               </svg>
//             </div>
//             <div>
//               <strong className="text-green-400">Easy Integration:</strong> Seamlessly integrate our firewall service with a simple SDK.
//             </div>
//           </li>
//         </ul>
//       </section>

//       {/* Call-to-Action */}
//       <section className="mt-12 text-center">
//         <a
//           href="/sdk-setup"
//           className="inline-block bg-green-600 text-white text-xl font-semibold py-3 px-6 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg"
//         >
//           Learn how to integrate the firewall SDK into your web app
//         </a>
//       </section>
//     </div>
//   );
// };

// export default HomePage;


import React from "react";

const HomePage = () => {
  return (
    <div className="container mx-auto my-8 px-6 py-12 max-w-5xl space-y-16 bg-gray-900">
      {/* Hero Section */}
      <header className="text-center mb-12 animate-fadeInDown">
        <h1 className="text-5xl font-extrabold text-green-400 mb-4 leading-tight">
          Real-Time XAI-Powered IP Threat Detection &amp; Prevention
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Experience unparalleled security for your web applications with our
          advanced firewall that leverages Explainable AI (XAI) to deliver real-time threat detection and automated
          responses. Safeguard your digital assets with a solution that not only protects but also explains every decision.
        </p>
      </header>

      {/* How It Works Section */}
      <section className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg animate-fadeInUp">
        <h2 className="text-4xl font-semibold text-gray-100 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-green-400">Continuous Monitoring:</strong> Our system constantly scans your network traffic, instantly detecting anomalies and suspicious behavior.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-green-400">AI-Powered Analysis:</strong> Advanced XAI algorithms analyze threats and provide transparent, actionable insights.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-green-400">Automated Response:</strong> Automatically block malicious IPs in real-time to prevent potential attacks.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-green-400">Actionable Reports:</strong> Receive detailed reports and visual insights to continuously improve your security posture.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="mt-12 animate-fadeInUp">
        <h2 className="text-4xl font-semibold text-gray-100 mb-8 text-center">
          Key Features
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-lg text-gray-300">
          <li className="flex items-start space-x-4 transition transform hover:scale-105 duration-300">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
              </svg>
            </div>
            <div>
              <strong className="text-green-400">Real-Time Detection:</strong>
              <p className="mt-1">
                Instantly identifies malicious IPs to secure your network.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4 transition transform hover:scale-105 duration-300">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
              </svg>
            </div>
            <div>
              <strong className="text-green-400">Explainable AI:</strong>
              <p className="mt-1">
                Gain clear insights into threat decisions with cutting-edge XAI.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4 transition transform hover:scale-105 duration-300">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
              </svg>
            </div>
            <div>
              <strong className="text-green-400">Next-Generation Firewall:</strong>
              <p className="mt-1">
                Automatically blocks harmful IP addresses, keeping your apps safe.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4 transition transform hover:scale-105 duration-300">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
              </svg>
            </div>
            <div>
              <strong className="text-green-400">Easy Integration:</strong>
              <p className="mt-1">
                Seamlessly add our SDK to your app for immediate protection.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="mt-12 text-center animate-bounce">
        <a
          href="/sdk-setup"
          className="inline-block bg-green-600 text-white text-xl font-semibold py-3 px-8 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg"
        >
          Integrate Now &amp; Secure Your App
        </a>
      </section>
    </div>
  );
};

export default HomePage;
