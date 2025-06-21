import { getSocket } from "@/lib/socket";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "sonner";

const useQuizSocket = (
  quizId: string,
  setQuizData: Dispatch<any>,
  setTotalQuestions: Dispatch<SetStateAction<number>>,
  setJoinPlayers: Dispatch<SetStateAction<number>>,
  setActivePlayers: Dispatch<SetStateAction<number>>,
  setEliminatedPlayers: Dispatch<SetStateAction<number>>,
  setTopUsers: Dispatch<SetStateAction<any[]>>,
  setLstQuestion: Dispatch<SetStateAction<any[]>>,
  setWinnerList: Dispatch<SetStateAction<any[]>>
) => {
  useEffect(() => {
    if (!quizId) return;
    
    console.log("Initializing socket for quiz:", quizId);
    const socket = getSocket();

    // If already connected, fetch data immediately
    if (socket.connected) {
      console.log("Socket already connected, fetching data...");
      socket.emit("quiz_detail", { quizId: quizId });
      socket.emit("question_list", { quizId: quizId });
    }

    const handleConnect = () => {
      console.log("✅ Connected to socket server:", socket.id);
      // Fetch data on connection
      socket.emit("quiz_detail", { quizId: quizId });
      socket.emit("question_list", { quizId: quizId });
    };

    const handleQuizDetail = (data: any) => {
      // console.log("Handle Quiz Detail:", data);
      setQuizData(data?.data);
    };
    const handleQuestionList = (data: any) => {
      console.log("handleQuestionList: ", data);
      if (data && Array.isArray(data)) {
        setLstQuestion(data);
      } else {
        console.error("Invalid question list data received:", data);
      }
    };
    const handleTotalQuestion = (data: any) => {
      // console.log("Total question:", data);
      setTotalQuestions(data);
    };
    const handleJoinPlayers = (data: any) => {
      // console.log("Join Players:", data);
      setJoinPlayers(data);
    };
    const handleActivePlayers = (data: any) => {
      console.log("Active Players:", data);
      setActivePlayers(data);
    };
    const handleEliminatedPlayers = (data: any) => {
      console.log("Eliminated Players:", data);
      setEliminatedPlayers(data);
    };
    const handleTopUsers = (data: any) => {
      // console.log("Top Users:", data);
      setTopUsers(data);
    };
    const handleShowQuestion = (data: any) => {
      if (data.code == 404) {
        toast.error(data.error ?? "Something went wrong.");
      }
    };

    const handleCurrentQuestion = (data: any) => {
      // console.log("handleCurrentQuestion:", data);
    };
    const handleComplete = (data: any) => {
      console.log("handleComplete:", data);
      setWinnerList(data.participants);
    };
    const handleError = (err: any) => {
      console.error("❌ Socket error:", err);
    };

    // Register listeners
    // Connect to socket if not already connected
    if (!socket.connected) {
      console.log("Establishing new socket connection...");
      socket.connect();
    }
    
    socket.on("connect", handleConnect);
    socket.on("quiz_detail", handleQuizDetail);
    socket.on("question_list", handleQuestionList);
    socket.on("total_question", handleTotalQuestion);
    socket.on("joinPlayers", handleJoinPlayers);
    socket.on("activePlayers", handleActivePlayers);
    socket.on("eliminatedPlayers", handleEliminatedPlayers);
    socket.on("top_users", handleTopUsers);
    socket.on("show_question", handleShowQuestion);
    socket.on("current_question", handleCurrentQuestion);
    socket.on("complete_quiz", handleComplete);
    socket.on("connect_error", handleError);

    // Cleanup
    return () => {
      socket.off("connect", handleConnect);
      socket.off("quiz_detail", handleQuizDetail);
      socket.on("question_list", handleQuestionList);
      socket.off("total_question", handleTotalQuestion);
      socket.off("joinPlayers", handleJoinPlayers);
      socket.off("activePlayers", handleActivePlayers);
      socket.off("eliminatedPlayers", handleEliminatedPlayers);
      socket.off("top_users", handleTopUsers);
      socket.off("show_question", handleShowQuestion);
      socket.off("current_question", handleCurrentQuestion);
      socket.off("complete_quiz", handleComplete);
      socket.off("connect_error", handleError);
    };
  }, [quizId]);
};

export default useQuizSocket;
