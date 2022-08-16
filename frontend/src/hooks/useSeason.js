import { useTotoContext } from './useTotoContext'
import { errorToast, successToast } from '../utils/toast'

export const useSeason = () => {
  const { dispatch } = useTotoContext()

  const getSeasons = async () => {
    const response = await fetch('/api/season/all')

    const { data, status, message } = await response.json()

    if (status === 'success') {
      dispatch({ type: 'SET_SEASONS', payload: data })
      const years = data.filter((season) => season.status === 'finished').map(({ year }) => year)
      dispatch({ type: 'SET_YEARS', payload: years })
      data.some((season) => season.status === 'active' && dispatch({ type: 'SET_ONGOING', payload: true }))
    } else {
      errorToast(message)
    }
  }

  const getTeamSelection = async () => {
    const response = await fetch('/api/team/selection')
    const { status, data, message } = await response.json()

    if (status === 'success') {
      await dispatch({ type: 'SET_TEAMSELECTION', payload: data })

      getSeasons()
    }

    if (status === 'error') {
      errorToast(message)
    }
  }

  const addTeamToSelection = async (countryName, countryFlag) => {
    const response = await fetch('/api/team/selection', {
      method: 'POST',
      body: JSON.stringify({ countryName, countryFlag }),
      headers: { 'Content-Type': 'application/json' },
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
    }

    if (status === 'error') {
      errorToast(message)
    }
  }

  const startSeason = async (seasonsYear, selectedTeams) => {
    const response = await fetch('/api/season/new', {
      method: 'POST',
      body: JSON.stringify({ seasonsYear, selectedTeams }),
      headers: { 'Content-Type': 'application/json' },
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
      getSeasons()
    }

    if (status === 'error') {
      errorToast(message)
    }
  }

  const finishSeason = async () => {
    const response = await fetch('/api/season/finish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })

    const { status, message } = await response.json()

    if (status === 'success') {
      successToast(message)
      getSeasons()
    }

    if (status === 'error') {
      errorToast(message)
    }
  }

  return {
    getSeasons, getTeamSelection, startSeason, finishSeason, addTeamToSelection,
  }
}
