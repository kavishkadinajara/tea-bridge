/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
"use client";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
// eslint-disable-next-line import/order
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Alert,
  AlertTitle,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";

import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils/cn";
import { createClient } from "@/lib/utils/supabase/client";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  services: string[];
  profile_photo: string;
  description: string;
  address: string;
  telephone: string;
  factory_name: string;
  town: string;
  tea_leaf_price: number;
  id: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);

      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => window && window.innerWidth < 768;

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          ref={carouselRef}
          className="flex w-full overflow-x-scroll py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l" />
          <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
                initial={{
                  opacity: 0,
                  y: 20,
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            disabled={!canScrollLeft}
            onClick={scrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative z-40 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
            disabled={!canScrollRight}
            onClick={scrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [reqButtonText, setReqButtonText] = useState("Choose us");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    const requestButton = async () => {
      const supabase = createClient();

      const { data: supplierRequestStatus, error } = await supabase
        .from("suppliers_factories")
        .select("request_status")
        .eq("supplier_id", userId)
        .eq("factory_id", card.id);

      if (error) {
        toast.error("An error occurred while checking request status.");

        return;
      }

      if (supplierRequestStatus.length > 0) {
        if (supplierRequestStatus[0].request_status === "Accepted") {
          setReqButtonText("Your are member of our factory 🎉");
        }
        if (supplierRequestStatus[0].request_status === "Pending") {
          setReqButtonText("Your request is pending... 🕒");
        }
        if (supplierRequestStatus[0].request_status === "Rejected") {
          setReqButtonText("Your request is rejected 😢");
        }
      }
    };

    const initializeData = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUserId(data.user.id);
        setUserType(data.user.user_metadata?.userType);
      } else {
        toast.error("No user found. Please log in.");
        window.location.href = "/auth";
      }
      setLoading(false);
    };

    initializeData().then(requestButton);

    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  async function supplierRequest() {
    const supabase = createClient();

    if (!userId) {
      toast.error("You need to be logged in to perform this action.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
      });

      setTimeout(() => {
        window.location.href = "/auth";
      }, 1500);

      return;
    } else {
      const { data: supplierRequestStatus, error } = await supabase
        .from("suppliers_factories")
        .select("request_status")
        .eq("supplier_id", userId)
        .eq("factory_id", card.id);

      if (error) {
        toast.error("An error occurred while checking request status.");

        return;
      }

      if (supplierRequestStatus?.length === 0) {
        const { error: insertError } = await supabase
          .from("suppliers_factories")
          .insert([{ supplier_id: userId, factory_id: card.id }]);

        if (insertError) {
          toast.error("An error occurred while sending your request.");
        } else {
          toast.success("Request sent successfully.");
        }
      } else {
        toast.info("You have already sent a request to this factory.");
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 h-screen z-40 overflow-auto">
            <motion.div
              animate={{ opacity: 1 }}
              className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            />
            <motion.div
              ref={containerRef}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-5xl mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-neutral-800 dark:to-neutral-900 shadow-2xl border border-gray-200 dark:border-neutral-700 h-fit z-[60] my-10 p-8 md:p-12 rounded-3xl font-sans relative"
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <button
                className="absolute top-6 right-6 h-12 w-12 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all"
                onClick={handleClose}
              >
                <IconX className="h-7 w-7 text-neutral-100 dark:text-neutral-900" />
              </button>

              <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-neutral-800 dark:text-white text-center tracking-tight"
                layoutId={
                  layout ? `factory_name-${card.factory_name}` : undefined
                }
              >
                {card.factory_name}
              </motion.h2>
              <motion.p
                className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase text-center mt-2 tracking-widest"
                layoutId={layout ? `category-${card.factory_name}` : undefined}
              >
                {card.town}
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl font-medium text-neutral-700 dark:text-neutral-300 mt-6 leading-relaxed text-center"
                layoutId={layout ? `price-${card.factory_name}` : undefined}
              >
                🌿 We proudly offer{" "}
                <span className="text-green-600 dark:text-green-400 font-bold text-4xl">
                  Rs. {card.tea_leaf_price}
                </span>{" "}
                per kilogram for your premium tea leaves! Your hard work
                transforms into excellence, one sip at a time ☕.
              </motion.p>

              <div className="mt-8 space-y-6">
                <motion.p className="flex items-center text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300">
                  📞{" "}
                  <span className="ml-2 text-neutral-800 dark:text-neutral-100">
                    Telephone:
                  </span>{" "}
                  {card.telephone}
                </motion.p>
                <motion.p className="flex items-center text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300">
                  📍{" "}
                  <span className="ml-2 text-neutral-800 dark:text-neutral-100">
                    Address:
                  </span>{" "}
                  {card.address}
                </motion.p>
                <motion.h3 className="text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ☺️ About us
                  </p>
                  {card.description}
                </motion.h3>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  🌟 Our Services
                </h3>
                <ul className="list-disc list-inside mt-4">
                  {Array.isArray(card.services) && card.services.length > 0 ? (
                    card.services.map((service, idx) => (
                      <li
                        key={idx}
                        className="text-neutral-700 dark:text-neutral-300"
                      >
                        {service}
                      </li>
                    ))
                  ) : (
                    <p className="text-neutral-500 dark:text-neutral-400">
                      No services listed yet.
                    </p>
                  )}
                </ul>
              </div>

              <motion.div className="mt-12 relative group">
                <BlurImage
                  alt={card.factory_name}
                  className="rounded-3xl transition-transform group-hover:scale-105 shadow-xl fade-edges w-full h-[350px] md:h-[600px] object-cover"
                  height={300}
                  src={card.profile_photo || "/default-factory.png"}
                  width={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <div className="py-12">
                <motion.div className="text-lg md:text-xl font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {card.content ||
                    "Discover the best tea leaves and enjoy quality at its finest!"}
                </motion.div>
              </div>

              {userType !== "tea_factory" && (
                <div className="text-center">
                  <motion.button
                    className="w-full lg:w-1/2 px-4 py-2 border-cyan-600 hover:border-lime-500 border-2 shadow-md shadow-cyan-600 hover:shadow-lime-600 transition-shadow duration-300 hover:shadow-lg text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-10 text-center"
                    // whileHover={{ scale: 1.1 }}
                    // whileTap={{ scale: 0.95 }}
                    onClick={supplierRequest}
                  >
                    {loading ? "Loading..." : reqButtonText}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
        layoutId={layout ? `card-${card.factory_name}` : undefined}
        onClick={handleOpen}
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-30 p-8">
          <motion.p
            className="text-white text-sm md:text-base font-medium font-sans text-left"
            layoutId={layout ? `category-${card.town}` : undefined}
          >
            {card.town}
          </motion.p>
          <motion.p
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            layoutId={layout ? `factory_name-${card.factory_name}` : undefined}
          >
            {card.factory_name}
          </motion.p>
          <motion.p
            className="text-white text-lg md:text-xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
            layoutId={layout ? `price-${card.factory_name}` : undefined}
          >
            Price per kilo: {card.tea_leaf_price}
          </motion.p>
        </div>
        <BlurImage
          fill
          alt={card.factory_name}
          className="object-cover absolute z-10 inset-0"
          src={card.src}
        />
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      alt={alt ? alt : "Background of a beautiful view"}
      blurDataURL={typeof src === "string" ? src : undefined}
      className={cn(
        "transition duration-300",
        isLoading ? "blur-sm" : "blur-0",
        className,
      )}
      decoding="async"
      height={height}
      loading="lazy"
      src={src}
      width={width}
      onLoad={() => setLoading(false)}
      {...rest}
    />
  );
};

const AlertComponent = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<
    "success" | "info" | "warning" | "error"
  >("info");

  const showAlert = (
    message: string,
    severity: "success" | "info" | "warning" | "error",
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = (
    _event: Event | React.SyntheticEvent<any, Event>,
    reason?: SnackbarCloseReason,
  ) => {
    setAlertOpen(false);
  };

  // Example usage of showAlert function
  useEffect(() => {
    showAlert("This is an info alert", "info");
  }, []);

  return (
    <>
      <Snackbar
        autoHideDuration={6000}
        open={alertOpen}
        onClose={handleAlertClose}
      >
        <Alert
          severity={alertSeverity}
          sx={{ width: "100%" }}
          onClose={handleAlertClose}
        >
          <AlertTitle>
            {alertSeverity.charAt(0).toUpperCase() + alertSeverity.slice(1)}
          </AlertTitle>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertComponent;
