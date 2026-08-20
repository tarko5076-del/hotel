export type Room = {
  id: string;
  image: string;
  imageClassName: string;
  imagePositionClassName: string;
  detailsClassName: string;
};

// Replace these temporary image URLs and category copy when Paradis Hotel photography is available.
export const rooms: Room[] = [
  {
    id: "deluxe",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1280&q=84",
    imageClassName: "lg:col-span-7",
    imagePositionClassName: "object-[62%_center] sm:object-[55%_center] lg:object-center",
    detailsClassName: "lg:col-span-4 lg:col-start-9 lg:self-end lg:pb-6",
  },
  {
    id: "executive",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1280&q=84",
    imageClassName: "lg:col-span-5 lg:col-start-2",
    imagePositionClassName: "object-[58%_center] sm:object-center",
    detailsClassName: "lg:col-span-5 lg:col-start-8 lg:self-center",
  },
  {
    id: "junior-suite",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1280&q=84",
    imageClassName: "lg:col-span-6 lg:col-start-7",
    imagePositionClassName: "object-[57%_center] sm:object-[50%_center] lg:object-center",
    detailsClassName: "lg:col-span-5 lg:col-start-1 lg:self-end lg:pb-6",
  },
];
