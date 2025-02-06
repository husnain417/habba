import React from 'react';

const AnimatedWave = ({ color = "#047857", height = "120", className = "" }) => {
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg 
        className="w-full h-auto" 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M 0 60 
               Q 150 40 360 60 
               Q 570 80 720 60 
               Q 870 40 1080 60 
               Q 1290 80 1440 60 
               L 1440 120 
               L 0 120 
               Z"
          >
            <animate
              attributeName="d"
              values="
                M 0 60 Q 150 20 360 70 Q 570 100 720 50 Q 870 20 1080 80 Q 1290 100 1440 60 L 1440 120 L 0 120 Z;
                M 0 80 Q 150 60 360 20 Q 570 40 720 80 Q 870 60 1080 30 Q 1290 20 1440 50 L 1440 120 L 0 120 Z;
                M 0 40 Q 150 80 360 50 Q 570 20 720 70 Q 870 90 1080 40 Q 1290 60 1440 80 L 1440 120 L 0 120 Z;
                M 0 60 Q 150 20 360 70 Q 570 100 720 50 Q 870 20 1080 80 Q 1290 100 1440 60 L 1440 120 L 0 120 Z"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </defs>
        <use href="#gentle-wave" fill={color} />
        <use 
          href="#gentle-wave" 
          fill={color} 
          opacity="0.5"
          transform="translate(-50 3)"
        >
          <animate
            attributeName="transform"
            values="
              translate(-50 3);
              translate(-25 5);
              translate(-40 2);
              translate(-50 3)"
            dur="3s"
            repeatCount="indefinite"
          />
        </use>
        <use 
          href="#gentle-wave" 
          fill={color} 
          opacity="0.3"
          transform="translate(50 2)"
        >
          <animate
            attributeName="transform"
            values="
              translate(50 2);
              translate(25 4);
              translate(35 1);
              translate(50 2)"
            dur="2s"
            repeatCount="indefinite"
          />
        </use>
      </svg>
    </div>
  );
};

const WaveSection = () => {
    const imagePaths = [
        '/assets/img1.png',
        '/assets/img2.jpeg',
        '/assets/img3.jpeg',
        '/assets/img4.jpg',
        '/assets/img3.jpeg',
        '/assets/img4.jpg',
        '/assets/img2.jpeg',
    ];

    return (
        <div className="relative w-full pt-6 mt-20">
            {/* Top wave */}
            <AnimatedWave className="transform rotate-180" />
            
            {/* Content Section */}
            <div className="bg-white py-4 px-4">
                {/* Text Content */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-black mb-4">Loved by 1 Lakh Pakistani's</h2>
                    <p className="text-2xl text-black">Over 5000+ Positive Reviews</p>
                </div>

                {/* Image Grid - Responsive */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* First image - Full height on larger screens */}
                        <div className="lg:row-span-2 h-64 lg:h-full lg">
                            <div className="h-full rounded-2xl overflow-hidden">
                                <img 
                                    src={imagePaths[0]}
                                    alt="Review 1"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Remaining images */}
                        {imagePaths.slice(1).map((path, index) => (
                            <div key={index} className="h-64">
                                <div className="h-full rounded-2xl overflow-hidden">
                                    <img 
                                        src={path}
                                        alt={`Review ${index + 2}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Bottom wave */}
            <AnimatedWave />
        </div>
    );
};

export default WaveSection;