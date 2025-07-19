import Review from "./Review";

interface ReviewData {
  image: string;
  rating: number;
  title: string;
  content: string;
  author: string;
  designation: string;
}

interface ReviewsProps {
  reviews?: ReviewData[];
}

const defaultReviews: ReviewData[] = [
  {
    image: '/img/review1.jpg',
    rating: 5,
    title: "Best app ever!",
    content:
      "This app has been a game-changer for me! It's made tracking my daily activities so much easier. I love how intuitive and user-friendly it is.",
    author: "Jonas Aly",
    designation: "Student",
  },
  {
    image: '/img/review2.jpg',
    rating: 5,
    title: "Super helpful to stay organized",
    content:
      "I can't thank this app enough for helping me stay on top of my tasks. The reminders have saved me from missing important deadlines, and I'm much more organized now.",
    author: "Mark Bures",
    designation: "Designer",
  }
];

const Reviews: React.FC<ReviewsProps> = ({ reviews = defaultReviews }) => {
  return (
    <section className="my-24 py-24 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-center mb-8 text-gray-900 dark:text-white">
          Meet Our Users
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
