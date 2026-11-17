import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-ivory px-6">
      <h1 className="text-9xl font-serif text-burgundy/20 mb-4">404</h1>
      <h2 className="text-3xl font-serif text-charcoal mb-4">Page Not Found</h2>
      <p className="text-charcoal/60 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-burgundy text-ivory px-8 py-3 text-sm tracking-widest uppercase hover:bg-charcoal transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
