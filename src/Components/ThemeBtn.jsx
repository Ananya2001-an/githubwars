export default function ThemeBtn(props) {return (
		<div className='theme-btn'>
			<label className='switch'>
				<input type='checkbox' id='checkbox' onChange={props.onChange} />
				<div className='slider round'></div>
			</label>
		</div>
	);
}