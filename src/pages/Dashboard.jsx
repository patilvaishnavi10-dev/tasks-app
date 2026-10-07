import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Paper, IconButton, Grid, CircularProgress } from '@mui/material'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { CollectionIcon } from '../components/collections/icons'
import { TaskRow } from '../components/tasks/TaskRow'
import { useAuth } from '../context/AuthContext'
import { useData } from '../context/DataContext'

export function Dashboard() {
  const { user } = useAuth()
  const { collections, toggleTask } = useData()
  const navigate = useNavigate()

  const firstName = (user?.name || '').split(' ')[0] || 'Friend'
  const allTasksCount = collections.reduce((acc, c) => acc + c.tasks.length, 0)
  const doneTasksCount = collections.reduce((acc, c) => acc + c.tasks.filter((t) => t.done).length, 0)
  const percentDone = allTasksCount === 0 ? 0 : Math.round((doneTasksCount / allTasksCount) * 100)

  return (
    <AppLayout withSidebar>
      <Box sx={{ mb: 6, mt: 2 }}>
        <Typography sx={{ color: 'text.secondary', fontSize: 16, textTransform: 'uppercase', letterSpacing: 2, mb: 1 }}>
          Overview
        </Typography>
        <Typography variant="h2" sx={{ background: 'linear-gradient(135deg, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome back,<br /> {firstName}.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left Column: Stats & Progress */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 4, mb: 3, textAlign: 'center', background: 'linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, rgba(255,255,255,0.02) 100%)' }}>
            <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
              <CircularProgress variant="determinate" value={100} size={120} thickness={4} sx={{ color: 'rgba(255,255,255,0.05)' }} />
              <CircularProgress variant="determinate" value={percentDone} size={120} thickness={4} sx={{ color: '#ec4899', position: 'absolute', left: 0 }} />
              <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h4">{percentDone}%</Typography>
              </Box>
            </Box>
            <Typography variant="h6">Overall Progress</Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>{doneTasksCount} of {allTasksCount} tasks completed</Typography>
          </Paper>

          <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Workspaces</Typography>
          <Stack spacing={1.5}>
            {collections.map(c => {
              const total = c.tasks.length
              const done = c.tasks.filter(t => t.done).length
              return (
                <Paper key={c.id} onClick={() => navigate(`/collections/${c.id}`)} sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' } }}>
                  <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ width: 32, height: 32, borderRadius: 2, bgcolor: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CollectionIcon icon={c.icon} sx={{ color: '#fff', fontSize: 16 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 600 }}>{c.name}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 12, color: 'text.secondary', bgcolor: 'rgba(255,255,255,0.1)', px: 1, py: 0.5, borderRadius: 1 }}>{done} / {total}</Typography>
                  </Stack>
                </Paper>
              )
            })}
          </Stack>
        </Grid>

        {/* Right Column: Focus List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, md: 4 } }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
              <PlayArrowRoundedIcon sx={{ color: '#a855f7' }} />
              <Typography variant="h5">Today's Focus</Typography>
            </Stack>

            <Stack spacing={3}>
              {collections.map(c => {
                const dueTasks = c.tasks.filter(t => !t.done && t.due)
                if (dueTasks.length === 0) return null
                return (
                  <Box key={c.id}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: c.color }} />
                      <Typography sx={{ color: 'text.secondary', fontSize: 14, fontWeight: 600 }}>{c.name}</Typography>
                    </Stack>
                    <Stack divider={<Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }} />}>
                      {dueTasks.map(t => (
                        <TaskRow key={t.id} task={t} color={c.color} onToggle={() => toggleTask(c.id, t.id)} />
                      ))}
                    </Stack>
                  </Box>
                )
              })}
              {collections.every((c) => c.tasks.filter((t) => !t.done && t.due).length === 0) && (
                <Stack alignItems="center" sx={{ py: 6, opacity: 0.5 }}>
                  <CheckCircleRoundedIcon sx={{ fontSize: 48, color: '#ec4899', mb: 2 }} />
                  <Typography variant="h6">You're all caught up!</Typography>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </AppLayout>
  )
}
