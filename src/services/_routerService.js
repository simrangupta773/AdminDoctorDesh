
import {
	AsyncCommunicationComponent,
	AsyncPatientDoseComponent,
	AsyncTermConditionsComponent,
	AsyncPatientReferralComponent,
	AsyncProviderComponent,
	AsyncEducationalVideoComponent,
	AsyncSurveyComponent,
	AsyncChatComponent,
	AsyncAboutUsComponent,
	AsyncNotificationListComponent,
	AsyncVideoInsructionComponent,
	AsyncMeditationComponent,
	AsyncMainOfficeComponent,
	AsyncProvidersTimingComponent,
	AsyncUserComponent,
} from 'Components/AsyncComponent/AsyncComponent';

export default [
	{
		path: 'provider',
		component: AsyncProviderComponent
	},
	{
		path: 'user',
		component: AsyncUserComponent
	},
	{
		path: 'communication',
		component: AsyncCommunicationComponent,
	},
	{
		path: 'patient-dose',
		component: AsyncPatientDoseComponent,
	},
	{
		path: 'term-conditions',
		component: AsyncTermConditionsComponent,
	},
	{
		path: 'video-instruction',
		component: AsyncVideoInsructionComponent,
	},
	{
		path: 'patient-referral',
		component: AsyncPatientReferralComponent,
	},
	{
		path: 'educational-video',
		component: AsyncEducationalVideoComponent
	},
	{
		path: 'survey',
		component: AsyncSurveyComponent,
	},
	 {
		path: 'chat',
		component: AsyncChatComponent
	},
	{
		path: 'about-us',
		component: AsyncAboutUsComponent
	},
	{
		path: 'notification-list',
		component: AsyncNotificationListComponent
	},
	{
		path: 'meditation',
		component: AsyncMeditationComponent
	},
	{
		path: 'main-office',
		component: AsyncMainOfficeComponent
	},
	{
		path: 'providers_timings',
		component: AsyncProvidersTimingComponent
	},
	
	
]