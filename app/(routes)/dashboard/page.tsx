"use client"
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect, useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { Box, Grid} from "@mui/material";
import { signOut } from "next-auth/react";
import StatCard2 from "./components/statcard2";
import HighlightedCard from "./components/highlightedCard";
import SessionsChart from "./components/sessionsChart";
import PageViewsBarChart from "./components/pagesViewBarChart";

export default function DashboardPage() {
  const session = getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }



  const statsData = [
    {
      id: 1,
      title: "Total Tasks",
      stat: 20,
    },
    {
      id: 2,
      title: "Completed",
      stat: 10,
    },
    {
      id: 3,
      title: "Pending",
      stat: 10,
    },
  ];

  const data = [
    {
      title: 'Users',
      value: '14k',
      interval: 'Last 30 days',
      trend: 'up',
      data: [
        200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
        360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
      ],
    },
    {
      title: 'Conversions',
      value: '325',
      interval: 'Last 30 days',
      trend: 'down',
      data: [
        1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
        780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
      ],
    },
    {
      title: 'Event count',
      value: '200k',
      interval: 'Last 30 days',
      trend: 'neutral',
      data: [
        500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
        520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
      ],
    },
  ];

  return (
    <div>
      
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' }, paddingTop: '30px' }}>
        {/* cards */}
       
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{ mb: (theme) => theme.spacing(2) }}
        >
          {data.map((card, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard2 {...card} />
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <HighlightedCard />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <SessionsChart />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
          <PageViewsBarChart />
        </Grid>
        </Grid></Box>
    </div>
  );
}
