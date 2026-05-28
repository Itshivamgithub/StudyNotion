const mongoose = require("mongoose");
const Category = require("./Model/Category");
require("dotenv").config();

const categories = [
  // Subjects
  {
    name: "AI",
    description: "Explore the world of Artificial Intelligence, covering topics like neural networks, deep learning, and intelligent systems.",
  },
  {
    name: "Cloud Computing",
    description: "Understand cloud infrastructure, services, and deployment models with platforms like AWS, Azure, and Google Cloud.",
  },
  {
    name: "Code Foundations",
    description: "Build a strong foundation in coding logic, algorithms, and problem-solving techniques essential for every developer.",
  },
  {
    name: "Computer Science",
    description: "Deep dive into the theoretical and practical foundations of computation and its applications.",
  },
  {
    name: "Cybersecurity",
    description: "Learn to protect systems and networks from digital attacks, covering ethical hacking, security protocols, and more.",
  },
  {
    name: "Data Analytics",
    description: "Learn to process and perform statistical analysis of data sets to discover useful information.",
  },
  {
    name: "Data Science",
    description: "Combine domain expertise, programming skills, and knowledge of mathematics and statistics to extract meaningful insights from data.",
  },
  {
    name: "Data Visualization",
    description: "Learn to represent information and data graphically to communicate insights clearly and efficiently.",
  },
  {
    name: "Developer Tools",
    description: "Master the tools that make development easier, including Git, Docker, and various IDEs.",
  },
  {
    name: "DevOps",
    description: "Learn the practices that combine software development (Dev) and IT operations (Ops) to shorten the systems development life cycle.",
  },
  {
    name: "Game Development",
    description: "Master the art and science of creating interactive games for various platforms using Unity, Unreal, or other engines.",
  },
  {
    name: "IT",
    description: "Explore Information Technology, covering network management, hardware maintenance, and enterprise software.",
  },
  {
    name: "Machine Learning",
    description: "Explore Machine Learning, covering topics like supervised and unsupervised learning, and popular ML libraries.",
  },
  {
    name: "Math",
    description: "Strengthen your mathematical foundations, essential for data science, AI, and complex algorithm development.",
  },
  {
    name: "Mobile Development",
    description: "Master mobile app development for Android and iOS using Java, Kotlin, Swift, or cross-platform frameworks.",
  },
  {
    name: "Web Design",
    description: "Learn to create visually appealing and user-friendly website designs, focusing on UI/UX principles.",
  },
  {
    name: "Web Development",
    description: "Learn to build modern websites and web applications using HTML, CSS, JavaScript, and popular frameworks like React and Node.js.",
  },
  // Languages
  {
    name: "Bash",
    description: "Master the Bash shell for automation, scripting, and efficient command-line interaction.",
  },
  {
    name: "C++",
    description: "Master C++ for high-performance applications, game development, and systems programming.",
  },
  {
    name: "C#",
    description: "Learn C# for building Windows applications, web services, and games with Unity.",
  },
  {
    name: "Go",
    description: "Learn Go (Golang) for building simple, reliable, and efficient software, especially in backend systems.",
  },
  {
    name: "HTML & CSS",
    description: "The building blocks of the web. Learn to structure and style beautiful, responsive websites.",
  },
  {
    name: "Java",
    description: "Learn Java for enterprise-grade applications, Android development, and robust backend systems.",
  },
  {
    name: "JavaScript",
    description: "Learn the language of the web. Master JavaScript for frontend development with React and backend with Node.js.",
  },
  {
    name: "Kotlin",
    description: "Learn Kotlin, the modern, concise, and safe language for Android and backend development.",
  },
  {
    name: "PHP",
    description: "Master PHP for server-side web development and building dynamic websites and applications.",
  },
  {
    name: "Python",
    description: "Master Python for web development, data science, automation, and more. One of the most versatile programming languages.",
  },
  {
    name: "R",
    description: "Learn R for statistical computing, data analysis, and creating high-quality graphics.",
  },
  {
    name: "Ruby",
    description: "Learn Ruby, a dynamic, open-source programming language with a focus on simplicity and productivity.",
  },
  {
    name: "SQL",
    description: "Master Structured Query Language for managing and manipulating relational databases.",
  },
  {
    name: "Swift",
    description: "Learn Swift for building powerful and intuitive apps for iOS, macOS, watchOS, and tvOS.",
  },
];

const seedCategories = async () => {
  try {
    const { MONGODB_URL } = process.env;
    if (!MONGODB_URL) {
      throw new Error("MONGODB_URL not found in .env");
    }

    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database for seeding...");

    for (const cat of categories) {
      const existing = await Category.findOne({ name: cat.name });
      if (!existing) {
        await Category.create(cat);
        console.log(`Added category: ${cat.name}`);
      } else {
        // Update existing category description if needed
        existing.description = cat.description;
        await existing.save();
        console.log(`Updated category: ${cat.name}`);
      }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
};

seedCategories();
