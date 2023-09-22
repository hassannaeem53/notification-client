import { useState } from "react";

const usePageState = () => {
  const [appPage, setAppPage] = useState<number>(1);
  const [eventPage, setEventPage] = useState<number>(1);
  const [notificationPage, setNotificationPage] = useState<number>(1);

  return {
    appPage,
    eventPage,
    notificationPage,
    setAppPage,
    setEventPage,
    setNotificationPage,
  };
};
export default usePageState;
