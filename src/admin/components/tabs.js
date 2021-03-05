import { Component } from '@wordpress/element';
import { TabPanel, Spinner, Notice, HorizontalRule } from '@wordpress/components';
import { GlobalSettings, StylesSettings, EmailsSettings, ButtonsSettings, getButtons } from './';

export class DsTabPanel extends Component {

	constructor(props) {    
		super(props)
		this.state = {
			buttons: {},
			currentButton: {},
			spinner: false,
			notice: {
				state: false,
				status: "",
				message: ""
			}
		}

		this.handleSpinner = this.handleSpinner.bind(this);
		this.handleNotice = this.handleNotice.bind(this);
		this.removeNotice = this.removeNotice.bind(this);
		this.resetButtons = this.resetButtons.bind(this);
		this.setCurrentButton = this.setCurrentButton.bind(this);
	}

	componentDidMount() {
		this.resetButtons()
	}

	componentDidUpdate() {
		this.resetButtons()
	}

	handleSpinner() {	
		this.setState( { spinner: !this.state.spinner } );
	}

	handleNotice( notice ) {
		this.setState( {
			notice: {
				state: notice.state,
				status: notice.status,
				message: notice.message
			} 
		});
	}

	removeNotice() {
		this.setState( {
			notice: {
				state: false,
				status: "",
				message: ""
			}
		});
	}

	resetButtons() {
		
		getButtons().then(      
			buttonsData => { 
				if(typeof buttonsData === "object"){
					Object.values( buttonsData ).map( data => {
						data.label = data.text;
					});
	
					this.setState({ buttons: Object.values( buttonsData ) });
				}
			}    
		);
	}

	setCurrentButton( button ) {
		this.setState( { currentButton: button });
	}
	
	
	render(){

		const { handleSpinner, handleNotice, setCurrentButton, state, props } = this;
		const { currentButton, buttons } = state;
		const { strings } = props;
		const passedData = {
			spinner: handleSpinner,
			notice: handleNotice,
			setButton: setCurrentButton,
			buttons: buttons,
			currentButton: currentButton,
			strings: strings
		}

		return (
			<div>
				<div className={`ds-spinner ${this.state.spinner ? "active" : "hidden"}`} >
					<Spinner />
				</div>
				<TabPanel
					className="ds-tab-panel"
					activeClass="ds-active-tab"
					tabs={ [
						{
							name: 'global',
							title: 'Global',
							className: 'ds-global-settings',
							content: <GlobalSettings />
						},
						{
							name: 'styles',
							title: 'Styles',
							className: 'ds-styles-settings',
							content: <StylesSettings />
						},
						{
							name: 'emails',
							title: 'Emails',
							className: 'ds-emails-settings',
							content: <EmailsSettings />
						},
						{
							name: 'buttons',
							title: 'Buttons',
							className: 'ds-buttons-settings',
							content: <ButtonsSettings data={passedData}/>
						},
					] }
				>
					{ ( tab ) => <div>
						<div className={`ds-notice ${this.state.notice.state ? "active" : ""}`} >
							<Notice 
								status={this.state.notice.status}
								onRemove={this.removeNotice}
							>
								{this.state.notice.message}
							</Notice>
						</div>
						<HorizontalRule />
						{ tab.content }
						
					</div> }
				</TabPanel>
				
			</div>
		)
	}
	
}