import { useNavigate } from 'react-router-dom'
import { Box, Stack, Typography, Button, Grid, Paper } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { useAuth } from '../context/AuthContext'

const features = [
  { icon: Inventory2RoundedIcon, title: 'Smart Collections', description: 'Organize anything into beautifully crafted collections. No clutter.', colSpan: 12 },
  { icon: TodayRoundedIcon, title: 'Daily Focus', description: 'See exactly what needs attention today.', colSpan: { xs: 12, md: 6 } },
  { icon: InsightsRoundedIcon, title: 'Analytics', description: 'Track your growth with rich statistics.', colSpan: { xs: 12, md: 6 } },
  { icon: DevicesRoundedIcon, title: 'Always Available', description: 'Your tasks live securely in your browser.', colSpan: 12 },
]

export function Landing() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const scrollToFeatures = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', pt: 3 }}>
      {/* Navbar */}
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', px: 4, mb: 10 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ p: 0.5, borderRadius: 2, background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>
            <CheckRoundedIcon sx={{ color: '#fff', fontSize: 24 }} />
          </Box>
          <Typography variant="h6" fontWeight={800}>Tasksio</Typography>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { color: '#a855f7' } }} onClick={() => navigate('/signin')}>Login</Typography>
          <Button variant="contained" onClick={() => navigate('/signin?mode=signup')}>Sign up free</Button>
        </Stack>
      </Stack>

      {/* Hero Section */}
      <Stack sx={{ alignItems: 'center', textAlign: 'center', px: 3, mb: 15 }}>
        <Box sx={{ mb: 2, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: 10, bgcolor: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
          <Typography sx={{ color: '#818cf8', fontSize: 13, fontWeight: 700 }}>v2.0 is out now</Typography>
        </Box>
        <Typography variant="h1" sx={{ fontSize: { xs: 44, md: 72 }, maxWidth: 800, mb: 3, lineHeight: 1.1 }}>
          The new standard for <span style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>productivity.</span>
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: 18, maxWidth: 500, mb: 5 }}>
          A magnificent approach to tracking your life. Beautifully designed, blazingly fast, and completely free.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(user ? '/dashboard' : '/signin')}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{ px: 4, py: 1.5, fontSize: 16 }}
        >
          {user ? 'Go to Dashboard' : 'Start Organizing'}
        </Button>
      </Stack>

      {/* Bento Grid Features */}
      <Box id="explore" sx={{ px: { xs: 3, md: 8 }, pb: 15 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 1 }}>Discover the power.</Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', mb: 8 }}>Everything you need, nothing you don't.</Typography>

        <Grid container spacing={3} maxWidth={1000} mx="auto">
          {features.map((f, i) => (
            <Grid item {...(typeof f.colSpan === 'number' ? { xs: f.colSpan } : f.colSpan)} key={i}>
              <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'rgba(255,255,255,0.02)' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 3, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                  <f.icon sx={{ color: '#a855f7', fontSize: 28 }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>{f.title}</Typography>
                <Typography sx={{ color: 'text.secondary', fontSize: 16 }}>{f.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}