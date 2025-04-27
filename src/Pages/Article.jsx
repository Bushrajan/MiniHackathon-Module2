import { useState , useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 

const articles = [
  {
    id: 1,
    title: "Going all-in with millennial design",
    image: "/blog1.png",
    authorImages: ["/blog0.png", "/blog01.png", "/blog02.png"],
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, a ptas dicta, sed provide",
  },
  {
    id: 2,
    title: "Handmade pieces that took time to make",
    image: "/blog2.png",
    authorImages: ["/blog0.png", "/blog01.png"],
    summary:
      "Creative handmade items that require patience and skill. nt iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },
  {
    id: 3,
    title: "Minimalist interior ideas",
    image: "/blog3.png",
    authorImages: ["/blog01.png", "/blog02.png"],
    summary:
      "How to keep your home looking sleek and modern with  usamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },
  {
    id: 4,
    title: "Wooden furniture ideas for your space",
    image: "/blog4.png",
    authorImages: ["/blog0.png", "/blog02.png"],
    summary:
      "Unique wooden furniture pieces that add warmth and style. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },
  {
    id: 5,
    title: "Beautiful crafts for every home",
    image: "/blog5.png",
    authorImages: ["/blog01.png", "/blog02.png"],
    summary:
      "Handmade crafts that bring personality to your living space. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },
  {
    id: 6,
    title: "Girl power that make a statement",
    image: "/blog6.png",
    authorImages: ["/blog0.png", "/blog01.png", "/blog02.png"],
    summary:
      "Top luxury interior designs that define elegance. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisciptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },

  {
    id: 7,
    title: "Luxury designs that make a statement",
    image: "/blog7.png",
    authorImages: ["/blog0.png", "/blog01.png", "/blog02.png"],
    summary:
      "Top luxury interior designs that define elegance. al Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },

  {
    id: 8,
    title: "Sunday statement",
    image: "/blog8.png",
    authorImages: ["/blog0.png", "/blog01.png", "/blog02.png"],
    summary:
      "Top luxury interior designs that define elegance. Lorem ipsum dolor sit amet consectetur adipisicing elit. V Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },

  {
    id: 9,
    title: "Girl power that make a statement",
    image: "/blog9.png",
    authorImages: ["/blog0.png", "/blog01.png", "/blog02.png"],
    summary:
      "Top luxury interior designs that define elegance. Lorem ipsum dolor sit amet consectetur adipisicing elit. V Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis iste minima temporibus voluptas dicta, sed provident iure repellat, inventore rerum, ab accusamus autem voluptatibus incidunt perferendis nisi! Ducimus, adipisci aliquam.",
  },
];

const ArticlesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(3); // Pehle 3 articles, phir 2 honge

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Update pagination behavior dynamically
  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
    setArticlesPerPage((prev) => (prev === 3 ? 2 : 3)); // Toggle between 3 and 2
  };
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <>
      {currentArticles.map((article) => (
        <div
          key={article.id}
          className="mb-3"
          data-aos="zoom-out"
          data-aos-duration="3000"
        >
          <img src={article.image} alt="Article Image" className="img-fluid" />
          
          <div className="article-content mt-3">
            <p className="meta">
              {article.authorImages.map((img, index) => (
                <img
                  src={img}
                  alt="Author"
                  key={index}
                  className="ms-lg-3 img-fluid"
                />
              ))}
            </p>
            <h2>{article.title}</h2>
            <p className="summary mt-3 mb-4">{article.summary}</p>
            <button className="button1 px-4 border-0  p-3 text-light">
              Read More
            </button>
          </div>
        </div>
      ))} 

      {/* Pagination Buttons */}
      <div className="pagination mt-5 justify-content-center">
        <button
          className="button2 p-3 px-4 m-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <button
          className="button2 p-3 px-4 m-1"
          onClick={handleNext}
          disabled={indexOfLastArticle >= articles.length}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ArticlesList;
