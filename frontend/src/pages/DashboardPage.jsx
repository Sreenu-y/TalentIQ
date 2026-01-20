import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";
import WelcomeSection from "../components/WelcomeSection";
import StatCards from "../components/StatCards";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(null);
  const [roomConfig, setRoomConfig] = useState({ problem: "", difficulty: "" });

  const createSessionMutation = useCreateSession();
  const { data: activeSessionsData, isLoading: loadingActiveSessions } =
    useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) return;

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data.session._id}`);
        },
      },
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user?.id) return false;

    return (
      session?.host?.clerkId === user.id ||
      session?.participant?.clerkId === user.id
    );
  };

  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

        {/* Grid Layout */}
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatCards
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessions
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>
          <RecentSessions
            sessions={recentSessions}
            isLoading={loadingRecentSessions}
          />
        </div>
      </div>
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default DashboardPage;
