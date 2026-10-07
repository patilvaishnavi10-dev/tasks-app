import { useMemo, useState } from 'react'
import { Box, Stack, Typography, IconButton, Menu, MenuItem, Grid, Paper, Divider } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import { AppLayout } from '../components/layout/AppLayout'
import { CollectionCard } from '../components/collections/CollectionCard'
import { CollectionFormModal } from '../components/collections/CollectionFormModal'
import { useData } from '../context/DataContext'

export function Collections() {
  const { collections, addCollection } = useData()
  const [tab, setTab] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState(null)
  const [sortAlpha, setSortAlpha] = useState(false)

  const visible = useMemo(() => {
    let list = tab === 'favourites' ? collections.filter((c) => c.favourite) : collections
    if (sortAlpha) list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [collections, tab, sortAlpha])

  return (
    <AppLayout>
      {/* Header Area Redesign */}
      <Box sx={{ mb: 5, p: 4, borderRadius: 4, background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(255,255,255,0.02) 100%)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h3" sx={{ mb: 1 }}>Spaces</Typography>
            <Typography sx={{ color: 'text.secondary' }}>Manage your tasks across {collections.length} different spaces.</Typography>
          </Box>
          <Box sx={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AutoAwesomeRoundedIcon sx={{ color: '#fff' }} />
          </Box>
        </Stack>
      </Box>

      {/* Toolbar Redesign */}
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 4, borderBottom: '1px solid rgba(255,255,255,0.05)', pb: 2 }}>
        <Stack direction="row" spacing={3}>
          {[
            ['all', 'All Spaces'],
            ['favourites', 'Starred'],
          ].map(([key, label]) => (
            <Box
              key={key}
              onClick={() => setTab(key)}
              sx={{
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                position: 'relative',
                color: tab === key ? 'text.primary' : 'text.secondary',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -17,
                  left: 0,
                  right: 0,
                  height: 2,
                  bgcolor: tab === key ? '#a855f7' : 'transparent',
                  borderRadius: 1,
                  transition: 'background-color 0.2s',
                }
              }}
            >
              {label}
            </Box>
          ))}
        </Stack>
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: 'text.secondary' }}>
          <MoreVertRoundedIcon />
        </IconButton>
        <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
          <MenuItem
            onClick={() => {
              setSortAlpha((v) => !v)
              setMenuAnchor(null)
            }}
          >
            {sortAlpha ? 'Reset Sorting' : 'Sort Alphabetically'}
          </MenuItem>
        </Menu>
      </Stack>

      <Grid container spacing={3}>
        {visible.map((c) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={c.id}>
            <CollectionCard collection={c} />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper
            onClick={() => setFormOpen(true)}
            elevation={0}
            sx={{
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 140,
              cursor: 'pointer',
              bgcolor: 'transparent',
              color: 'text.secondary',
              transition: 'all 0.2s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.03)', color: '#a855f7', borderColor: '#a855f7' },
            }}
          >
            <AddRoundedIcon sx={{ fontSize: 32, mb: 1 }} />
            <Typography sx={{ fontWeight: 600 }}>New Space</Typography>
          </Paper>
        </Grid>
      </Grid>

      {
        visible.length === 0 && (
          <Stack alignItems="center" sx={{ py: 8, opacity: 0.5 }}>
            <Typography variant="h6">No spaces found in this view.</Typography>
          </Stack>
        )
      }

      <CollectionFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onCreate={addCollection}
      />
    </AppLayout >
  )
}
