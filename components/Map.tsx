import React, { useState, useMemo, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Define the type for props
interface MapProps {
  userId: string | null;
}

const Map: React.FC<MapProps> = ({ userId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // Google Maps API
  const mapContainerStyle = {
    width: "100%",
    height: "600px", // Increased height for better view
  };

  const center = useMemo(() => ({ lat: 7.8731, lng: 80.7718 }), []); // Center of Sri Lanka

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Use your Google Maps API key here
  });

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setSelectedLocation({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  }, []);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <>
      <Button
        className="rounded-3xl text-xl font-medium md:text-2xl border-cyan-500 hover:border-lime-600 shadow-md shadow-cyan-400 hover:shadow-lime-500 px-7 md:px-12 py-20 flex flex-col items-center gap-1"
        variant="bordered"
        onPress={onOpen}
      >
        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
          Click here to
        </span>
        <div className="flex items-center gap-2">
          <span>Select Your Location</span>
        </div>
      </Button>

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        size="lg" // Increased modal size for better map view
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Select Your Location
          </ModalHeader>
          <ModalBody>
            <div className="mt-4">
              <GoogleMap
                center={center}
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                onClick={onMapClick} // Handle map click event
              >
                {selectedLocation && <Marker position={selectedLocation} />}{" "}
                {/* Show marker at selected location */}
              </GoogleMap>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="light"
              onPress={() => setSelectedLocation(null)}
            >
              Reset Location
            </Button>
            <Button
              color="primary"
              onPress={() =>
                console.log("Selected Location:", selectedLocation)
              }
            >
              Save Location
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Map;
