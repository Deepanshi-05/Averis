"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { TrendingUp, UserPlus, Loader2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import PostCard from "@/components/post-card";

export default function FeedPage() {
  const { user: currentUser } = useUser();
  const [activeTab, setActiveTab] = useState("feed");

  const { ref: loadMoreRef } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  // ✅ FIX: stable query params (THIS stops infinite fetch loop)
  const feedParams = useMemo(() => ({ limit: 15 }), []);
  const suggestedParams = useMemo(() => ({ limit: 6 }), []);
  const trendingParams = useMemo(() => ({ limit: 15 }), []);

  // Data queries
  const { data: feedData, isLoading: feedLoading } = useConvexQuery(
    api.feed.getFeed,
    feedParams
  );

  const { data: suggestedUsers, isLoading: suggestionsLoading } =
    useConvexQuery(api.feed.getSuggestedUsers, suggestedParams);

  const { data: trendingPosts, isLoading: trendingLoading } = useConvexQuery(
    api.feed.getTrendingPosts,
    trendingParams
  );

  const toggleFollow = useConvexMutation(api.follows.toggleFollow);

  const handleFollowToggle = async (userId) => {
    if (!currentUser) {
      toast.error("Please sign in to follow users");
      return;
    }

    try {
      await toggleFollow.mutate({ followingId: userId });
      toast.success("Follow status updated");
    } catch (error) {
      toast.error(error.message || "Failed to update follow status");
    }
  };

  // ✅ FIX: stable derived posts
  const currentPosts = useMemo(() => {
    return activeTab === "trending"
      ? trendingPosts || []
      : feedData?.posts || [];
  }, [activeTab, feedData, trendingPosts]);

  const isLoading =
    feedLoading || (activeTab === "trending" && trendingLoading);

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold gradient-text-primary pb-2">
            Discover Amazing Content
          </h1>
          <p className="text-slate-400">
            Stay up to date with the latest posts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">

          {/* FEED */}
          <div className="lg:col-span-4 space-y-6">

            {/* Tabs */}
            <div className="flex space-x-2">
              <Button
                onClick={() => setActiveTab("feed")}
                variant={activeTab === "feed" ? "primary" : "ghost"}
                className="flex-1"
              >
                For You
              </Button>

              <Button
                onClick={() => setActiveTab("trending")}
                variant={activeTab === "trending" ? "primary" : "ghost"}
                className="flex-1"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </Button>
            </div>

            {/* Create Post */}
            {currentUser && (
              <Link href="/dashboard/create" className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  {currentUser.imageUrl ? (
                    <Image
                      src={currentUser.imageUrl}
                      alt="user"
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-purple-600 flex items-center justify-center">
                      U
                    </div>
                  )}
                </div>

                <div className="flex-1 bg-slate-800 border border-slate-600 rounded-full px-4 py-3 text-slate-400">
                  What's on your mind?
                </div>
              </Link>
            )}

            {/* Loading */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
              </div>
            ) : currentPosts.length === 0 ? (
              <Card className="card-glass">
                <CardContent className="text-center py-12">
                  <p className="text-slate-400">No posts found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {currentPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            )}

            {/* Load more */}
            {activeTab === "feed" && feedData?.hasMore && (
              <div ref={loadMoreRef} className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-2 space-y-6 mt-14">

            <Card className="card-glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Suggested Users
                </CardTitle>
              </CardHeader>

              <CardContent>
                {suggestionsLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <div className="space-y-4">
                    {suggestedUsers?.map((user) => (
                      <div key={user._id} className="flex justify-between items-center">
                        <div>
                          <p className="text-white">{user.name}</p>
                          <p className="text-xs text-slate-400">@{user.username}</p>
                        </div>

                        <Button
                          size="sm"
                          onClick={() => handleFollowToggle(user._id)}
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Follow
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}