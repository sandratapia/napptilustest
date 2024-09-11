import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/dispatchHook'
import {
	fetchOompaLoompaDetail,
	clearSelectedOompaLoompa,
} from '../features/oompaLoompasSlice'
import '../styles/DetailView.css'

const DetailView = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()

	const { selectedOompaLoompa, status } = useAppSelector(
		(state) => state.oompaLoompas,
	)

	useEffect(() => {
		if (id) {
			dispatch(fetchOompaLoompaDetail(id))
		}

		return () => {
			dispatch(clearSelectedOompaLoompa())
		}
	}, [dispatch, id])

	if (status === 'loading') return <div>Loading...</div>
	if (status === 'failed')
		return <div>Failed to load Oompa Loompa details.</div>

	return (
		<>
			{selectedOompaLoompa && (
				<div className="oompa__details">
					<div>
						<img
							src={selectedOompaLoompa?.image}
							alt={`${selectedOompaLoompa?.first_name} ${selectedOompaLoompa?.last_name}`}
						/>
					</div>
					<div className="oompa__details__info">
						<h2>
							{selectedOompaLoompa?.first_name} {selectedOompaLoompa?.last_name}
						</h2>
						<p>{selectedOompaLoompa?.profession}</p>
						<p>{selectedOompaLoompa?.gender === 'F' ? 'Woman' : 'Man'}</p>
						<div
							dangerouslySetInnerHTML={{
								__html: selectedOompaLoompa?.description || '',
							}}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default DetailView
