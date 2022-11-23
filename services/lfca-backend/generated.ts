/* eslint-disable */
import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AchievementFunnelStats = {
  __typename?: 'AchievementFunnelStats';
  companiesAchievementReachedCount: Scalars['Int'];
  companiesCompletedFirstActionCount: Scalars['Int'];
  companiesCreatedCount: Scalars['Int'];
  /**
   * NOTE:
   * Logins are note related to the defined timerange.
   * Instead this property only indicates how many of the resulted companies have at least logged in once,
   * regardless of when the login happened.
   */
  companiesLoggedInCount: Scalars['Int'];
};

export type AchievementFunnelStatsInput = {
  achievementContentIds?: InputMaybe<Array<Scalars['String']>>;
  companiesCreatedFrom: Scalars['DateTime'];
  companiesCreatedUntil: Scalars['DateTime'];
  companySubscriptionType?: InputMaybe<CompanySubscriptionType>;
  programContentId?: InputMaybe<Scalars['String']>;
  statsUntil: Scalars['DateTime'];
};

export type ActionComment = {
  __typename?: 'ActionComment';
  attachments: Array<ActionCommentAttachment>;
  author?: Maybe<User>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  message: Scalars['String'];
};

export type ActionCommentAttachment = {
  __typename?: 'ActionCommentAttachment';
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  id: Scalars['ID'];
  mimeType: Scalars['String'];
  source: Scalars['String'];
};

export type ActionCommentAttachmentsInput = {
  actionContentId: Scalars['String'];
};

export type ActionCommentsInput = {
  actionContentId: Scalars['String'];
};

export type ActionStats = {
  __typename?: 'ActionStats';
  actionCompletedCount: Scalars['Int'];
  actionCompletedCountTotal: Scalars['Int'];
  actionContentId: Scalars['String'];
  category?: Maybe<Scalars['String']>;
};

export type ActionStatsInput = {
  statsFrom: Scalars['DateTime'];
  statsUntil: Scalars['DateTime'];
};

export type AddEventParticipantInput = {
  eventId: Scalars['String'];
  /** Only admins can set a status other than `AWAITING_ADMIN_APPROVAL` */
  status?: InputMaybe<EventParticipantStatus>;
  /** Only admins can add users other than themselves */
  userId?: InputMaybe<Scalars['String']>;
};

export type AddExternalEventParticipantInput = {
  eventId: Scalars['String'];
  externalUserEmail: Scalars['String'];
  /** Only admins can set a status other than `AWAITING_ADMIN_APPROVAL` */
  status?: InputMaybe<EventParticipantStatus>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sortWeight?: Maybe<Scalars['Int']>;
};

export type CompaniesInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CompaniesInputFilter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type CompaniesInputFilter = {
  companyIds?: InputMaybe<Array<Scalars['String']>>;
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};

export type CompaniesResult = {
  __typename?: 'CompaniesResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<Company>;
};

export type Company = {
  __typename?: 'Company';
  aboutSections?: Maybe<Array<Maybe<CompanyAboutSection>>>;
  /** Returns achievement contentIds that have been reached once (even though they have expired) based on the AchievementLog. */
  achievementContendIdsReachedOnce: Array<Scalars['String']>;
  campaignContribution?: Maybe<Scalars['String']>;
  campaignFiles: Array<File>;
  campaignGoals?: Maybe<Scalars['String']>;
  campaignParticipationPackages?: Maybe<Scalars['JSON']>;
  completedCompanyActions: Array<CompanyAction>;
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  crmId?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  employeeCount: Scalars['Int'];
  fundSize?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  internalDescription?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  micrositeSlug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  plannedCompanyActions: Array<CompanyAction>;
  program: CompanyProgram;
  programContentId: Scalars['String'];
  subscriptionType: CompanySubscriptionType;
  tags: Array<CompanyTag>;
  users: Array<User>;
  websiteUrl?: Maybe<Scalars['String']>;
};


export type CompanyUsersArgs = {
  filter?: InputMaybe<UsersInputFilter>;
};

export type CompanyAboutSection = {
  __typename?: 'CompanyAboutSection';
  heading?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type CompanyAboutSectionInput = {
  heading?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type CompanyAchievement = {
  __typename?: 'CompanyAchievement';
  completedCompanyActionsCount: Scalars['Int'];
  completedRequiredCompanyActionsCount: Scalars['Int'];
  contentId: Scalars['ID'];
  description?: Maybe<Scalars['JSON']>;
  editableCompanyProperties: Array<Scalars['String']>;
  micrositeUrl?: Maybe<Scalars['String']>;
  minCompletedCompanyActionsCount?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  recommendedActions: Array<CompanyAction>;
  requiredActions: Array<CompanyAction>;
};

export type CompanyAction = {
  __typename?: 'CompanyAction';
  badge?: Maybe<ContentAsset>;
  categories: Array<Category>;
  commentAttachmentCount: Scalars['Int'];
  commentCount: Scalars['Int'];
  comments: Array<ActionComment>;
  companiesCompletedCount: Scalars['Int'];
  /** Counts companies that have the action either planned or completed */
  companiesDoingCount: Scalars['Int'];
  companiesPlannedCount: Scalars['Int'];
  companyId?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  heroImage?: Maybe<ContentAsset>;
  /** A unique identifier generated using the contentId and companyId as long as the action has not expired */
  id: Scalars['ID'];
  impactValue: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  plannedAt?: Maybe<Scalars['DateTime']>;
  recentCompaniesCompleted: Array<Company>;
  /** Returns companies that have the action either planned or completed */
  recentCompaniesDoing: Array<Company>;
  recommendedForCompanyAchievementIds: Array<Scalars['ID']>;
  requiredForCompanyAchievementIds: Array<Scalars['ID']>;
  requirements: Array<CompanyActionRequirement>;
  serviceProviderList?: Maybe<ServiceProviderList>;
  title?: Maybe<Scalars['String']>;
};


export type CompanyActionRecentCompaniesCompletedArgs = {
  limit: Scalars['Int'];
};


export type CompanyActionRecentCompaniesDoingArgs = {
  limit: Scalars['Int'];
};

export type CompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
};

export type CompanyActionRequirement = {
  __typename?: 'CompanyActionRequirement';
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier generated using the CompanyAction.id and contentId */
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type CompanyActionsInput = {
  filter?: InputMaybe<CompanyActionsInputFilter>;
};

export type CompanyActionsInputFilter = {
  actionContentIds?: InputMaybe<Array<Scalars['String']>>;
  companyId?: InputMaybe<Scalars['ID']>;
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
  isPlanned?: InputMaybe<Scalars['Boolean']>;
};

export type CompanyInput = {
  companyId?: InputMaybe<Scalars['ID']>;
  companyMicrositeSlug?: InputMaybe<Scalars['String']>;
};

export type CompanyProgram = {
  __typename?: 'CompanyProgram';
  achievements: Array<CompanyAchievement>;
  availableMeasurementOptions: Array<Scalars['String']>;
  contentId: Scalars['ID'];
  name: Scalars['String'];
};

export enum CompanySubscriptionType {
  BASIC = 'BASIC',
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  SPONSORED = 'SPONSORED',
  VC_PORTFOLIO = 'VC_PORTFOLIO'
}

export type CompanyTag = {
  __typename?: 'CompanyTag';
  name: Scalars['ID'];
};

export type CompanyTagStatsResultItem = {
  __typename?: 'CompanyTagStatsResultItem';
  count: Scalars['Int'];
  tagName: Scalars['String'];
};

export type CompleteCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  companyId?: InputMaybe<Scalars['ID']>;
  isCompleted: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
};

export type CompleteCompanyActionRequirementInput = {
  actionContentId: Scalars['String'];
  actionRequirementContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type CompleteUserActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
  values?: InputMaybe<Scalars['JSON']>;
};

export type ContentAsset = {
  __typename?: 'ContentAsset';
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
};

export type CounterStatsResult = {
  __typename?: 'CounterStatsResult';
  actionCompletedCount: Scalars['Int'];
  companyCount: Scalars['Int'];
  countryCount: Scalars['Int'];
  employeeCount: Scalars['Int'];
  leaderCount: Scalars['Int'];
};

export type CreateActionCommentAttachmentInput = {
  fileName: Scalars['String'];
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  source: Scalars['String'];
};

export type CreateActionCommentInput = {
  actionContentId: Scalars['String'];
  attachments?: InputMaybe<Array<CreateActionCommentAttachmentInput>>;
  message: Scalars['String'];
};

export type CreateCompanyInput = {
  country: Scalars['String'];
  crmId?: InputMaybe<Scalars['String']>;
  employeeCount: Scalars['Int'];
  fundSize?: InputMaybe<Scalars['Int']>;
  internalDescription?: InputMaybe<Scalars['String']>;
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  programContentId: Scalars['String'];
  subscriptionType: CompanySubscriptionType;
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type CreateEventInput = {
  category: EventCategory;
  description?: InputMaybe<Scalars['String']>;
  end: Scalars['DateTime'];
  initialInviteStatus: EventParticipantStatus;
  recurrenceRule?: InputMaybe<Scalars['String']>;
  remindersBeforeStart?: InputMaybe<Array<Scalars['Int']>>;
  start: Scalars['DateTime'];
  title: Scalars['String'];
  videoConferenceUrl?: InputMaybe<Scalars['String']>;
};

export type CreateEventTokenInput = {
  eventId: Scalars['String'];
};

export type CreateServiceProviderReviewInput = {
  cons?: InputMaybe<Array<Scalars['String']>>;
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  pros?: InputMaybe<Array<Scalars['String']>>;
  rating: Scalars['Float'];
  review: Scalars['String'];
  serviceProviderContentId: Scalars['String'];
};

export type CreateUserInviteInput = {
  /**
   * Admin-only: Optionally defined the company the user should be assigned to.
   * Default: Company of the requesting user.
   */
  companyId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /**
   * Admin-only: Optionally define the role for the new user.
   * Default: OFFICER.
   */
  userRole?: InputMaybe<Scalars['String']>;
};

export type DeleteActionCommentInput = {
  id: Scalars['ID'];
};

export type DeleteCompanyInput = {
  companyId: Scalars['ID'];
};

export type DeleteServiceProviderReviewInput = {
  serviceProviderReviewId: Scalars['ID'];
};

export type DeleteUserInput = {
  userId: Scalars['ID'];
};

export type Event = {
  __typename?: 'Event';
  category: EventCategory;
  description?: Maybe<Scalars['String']>;
  end: Scalars['DateTime'];
  id: Scalars['ID'];
  initialInviteStatus?: Maybe<EventParticipantStatus>;
  /** Relative to the current date. Will be null if recurring event expired or one-time event has passed. */
  nextOccurrenceEnd?: Maybe<Scalars['DateTime']>;
  /** Relative to the current date. Will be null if recurring event expired or one-time event has passed. */
  nextOccurrenceStart?: Maybe<Scalars['DateTime']>;
  participants: Array<EventParticipant>;
  participantsAwaitingAdminApprovalCount: Scalars['Int'];
  participantsAwaitingUserRSVPCount: Scalars['Int'];
  participantsUserRSVPAcceptedCount: Scalars['Int'];
  participantsUserRSVPDeclinedCount: Scalars['Int'];
  /** status for the current user */
  participationStatus?: Maybe<EventParticipantStatus>;
  recurrenceOverrides?: Maybe<Array<EventRecurrenceOverride>>;
  recurrenceRule?: Maybe<Scalars['String']>;
  recurrenceRuleReadable?: Maybe<Scalars['String']>;
  remindersBeforeStart: Array<Scalars['Int']>;
  start: Scalars['DateTime'];
  status: EventStatus;
  title: Scalars['String'];
  videoConferenceUrl?: Maybe<Scalars['String']>;
};


export type EventParticipantsArgs = {
  filter?: InputMaybe<EventParticipantsInputFilter>;
};

export enum EventCategory {
  MASTERMIND_GROUP = 'MASTERMIND_GROUP',
  ONBOARDING_COURSE = 'ONBOARDING_COURSE'
}

export type EventInput = {
  eventId: Scalars['ID'];
};

export type EventParticipant = {
  __typename?: 'EventParticipant';
  id: Scalars['ID'];
  isExternal: Scalars['Boolean'];
  notes?: Maybe<Scalars['String']>;
  status: EventParticipantStatus;
  user: InternalExternalUser;
};

export enum EventParticipantStatus {
  AWAITING_ADMIN_APPROVAL = 'AWAITING_ADMIN_APPROVAL',
  AWAITING_USER_RSVP = 'AWAITING_USER_RSVP',
  USER_RSVP_ACCEPTED = 'USER_RSVP_ACCEPTED',
  USER_RSVP_DECLINED = 'USER_RSVP_DECLINED',
  USER_UNSUBSCRIBED = 'USER_UNSUBSCRIBED'
}

export type EventParticipantsInput = {
  eventId: Scalars['String'];
  filter?: InputMaybe<EventParticipantsInputFilter>;
};

export type EventParticipantsInputFilter = {
  status?: InputMaybe<EventParticipantStatus>;
};

export type EventRecurrenceOverride = {
  __typename?: 'EventRecurrenceOverride';
  description?: Maybe<Scalars['String']>;
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isCancelled: Scalars['Boolean'];
  start?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  videoConferenceUrl?: Maybe<Scalars['String']>;
};

export type EventStatsInput = {
  companySubscriptionType?: InputMaybe<CompanySubscriptionType>;
};

export type EventStatsResult = {
  __typename?: 'EventStatsResult';
  participationRequestsApprovedCount: Scalars['Int'];
  participationRequestsPendingCount: Scalars['Int'];
  runningEventsCount: Scalars['Int'];
};

export enum EventStatus {
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  RUNNING = 'RUNNING',
  UPCOMING = 'UPCOMING'
}

export type EventsInput = {
  filter?: InputMaybe<EventsInputFilter>;
};

export type EventsInputFilter = {
  category?: InputMaybe<EventCategory>;
  /** Default: false */
  includeCancelled?: InputMaybe<Scalars['Boolean']>;
  /** Default: false */
  includeExpired?: InputMaybe<Scalars['Boolean']>;
  /** Overrules potentially conflicting filters (e.g. status=CANCELLED + includeCancelled=false) */
  status?: InputMaybe<EventStatus>;
};

export type ExternalUser = {
  __typename?: 'ExternalUser';
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  name?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type FileInput = {
  name?: InputMaybe<Scalars['String']>;
  url: Scalars['String'];
};

export type InternalExternalUser = ExternalUser | User;

export type Mutation = {
  __typename?: 'Mutation';
  addEventParticipant: Event;
  /** Admin-only operation */
  addExternalEventParticipant: Event;
  completeCompanyAction: CompanyAction;
  completeCompanyActionRequirement: CompanyActionRequirement;
  completeUserAction: UserAction;
  createActionComment: ActionComment;
  createActionCommentExport: Scalars['String'];
  createCompany: Company;
  createCompanyExport: Scalars['String'];
  /** Admin-only operation */
  createEvent: Event;
  createEventParticipantExport: Scalars['String'];
  /** Admin-only operation */
  createEventToken?: Maybe<Scalars['String']>;
  createServiceProviderReview: ServiceProviderReview;
  createUserExport: Scalars['String'];
  createUserInvite: UserInvite;
  deleteActionComment: Scalars['Boolean'];
  deleteCompany: Company;
  deleteServiceProviderReview: ServiceProviderReview;
  deleteUser: User;
  planCompanyAction: CompanyAction;
  processCompanyActionDeprecation: Scalars['Boolean'];
  processCompanyActionExpiry: Scalars['Boolean'];
  processEventInviteToken: Event;
  processEventRSVPToken: Event;
  processUserActionExpiry: Scalars['Boolean'];
  purgeCache: Scalars['Boolean'];
  pushAchievementFunnelStatsToGeckoboard: Scalars['Boolean'];
  pushActionsCompletedStatsToGeckoboard: Scalars['Boolean'];
  pushEventStatsToGeckoboard: Scalars['Boolean'];
  registerUser: User;
  removeEventParticipant: Event;
  requestPasswordReset: Scalars['Boolean'];
  resendEmailVerification: Scalars['Boolean'];
  /** Admin-only operation */
  sendEventReminders: Scalars['Boolean'];
  triggerDeployment?: Maybe<Scalars['Boolean']>;
  updateActionComment: ActionComment;
  updateCompany: Company;
  /** Admin-only operation */
  updateEvent: Event;
  updateEventParticipantStatus: Event;
  updateServiceProviderReview: ServiceProviderReview;
  updateUser: User;
};


export type MutationAddEventParticipantArgs = {
  input: AddEventParticipantInput;
};


export type MutationAddExternalEventParticipantArgs = {
  input: AddExternalEventParticipantInput;
};


export type MutationCompleteCompanyActionArgs = {
  input: CompleteCompanyActionInput;
};


export type MutationCompleteCompanyActionRequirementArgs = {
  input: CompleteCompanyActionRequirementInput;
};


export type MutationCompleteUserActionArgs = {
  input: CompleteUserActionInput;
};


export type MutationCreateActionCommentArgs = {
  input: CreateActionCommentInput;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateEventTokenArgs = {
  input: CreateEventTokenInput;
};


export type MutationCreateServiceProviderReviewArgs = {
  input: CreateServiceProviderReviewInput;
};


export type MutationCreateUserInviteArgs = {
  input: CreateUserInviteInput;
};


export type MutationDeleteActionCommentArgs = {
  input: DeleteActionCommentInput;
};


export type MutationDeleteCompanyArgs = {
  input: DeleteCompanyInput;
};


export type MutationDeleteServiceProviderReviewArgs = {
  input: DeleteServiceProviderReviewInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationPlanCompanyActionArgs = {
  input: PlanCompanyActionInput;
};


export type MutationProcessEventInviteTokenArgs = {
  input: ProcessEventInviteTokenInput;
};


export type MutationProcessEventRsvpTokenArgs = {
  input: ProcessEventRsvpTokenInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRemoveEventParticipantArgs = {
  input: RemoveEventParticipantInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResendEmailVerificationArgs = {
  input?: InputMaybe<ResendEmailVerificationInput>;
};


export type MutationTriggerDeploymentArgs = {
  input: TriggerDeploymentInput;
};


export type MutationUpdateActionCommentArgs = {
  input: UpdateActionCommentInput;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateEventParticipantStatusArgs = {
  input: UpdateEventParticipantStatusInput;
};


export type MutationUpdateServiceProviderReviewArgs = {
  input: UpdateServiceProviderReviewInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PlanCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  companyId?: InputMaybe<Scalars['ID']>;
  isPlanned: Scalars['Boolean'];
};

export type ProcessEventInviteTokenInput = {
  notes?: InputMaybe<Scalars['String']>;
  /** System will check internally if user already exists or an external user should be created */
  participantEmail: Scalars['String'];
  participantStatus?: InputMaybe<EventParticipantStatus>;
  token: Scalars['String'];
};

export type ProcessEventRsvpTokenInput = {
  notes?: InputMaybe<Scalars['String']>;
  status: EventParticipantStatus;
  token: Scalars['String'];
};

export type QualifiedCompaniesInput = {
  achievementContentIds: Array<Scalars['String']>;
  filter?: InputMaybe<QualifiedCompaniesInputFilter>;
};

export type QualifiedCompaniesInputFilter = {
  companyMicrositeSlugs?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  achievementFunnelStats: AchievementFunnelStats;
  actionCommentAttachments: Array<ActionCommentAttachment>;
  actionComments: Array<ActionComment>;
  actionStats: Array<ActionStats>;
  companies: CompaniesResult;
  company: Company;
  companyAction: CompanyAction;
  companyActions: Array<CompanyAction>;
  companyTagStats: Array<CompanyTagStatsResultItem>;
  companyTags: Array<CompanyTag>;
  counterStats: CounterStatsResult;
  event: Event;
  eventParticipants: Array<EventParticipant>;
  eventStats: EventStatsResult;
  events: Array<Event>;
  qualifiedCompanies: Array<Company>;
  searchCompany: Array<Company>;
  searchUser: Array<User>;
  serviceProviderLists: Array<ServiceProviderList>;
  serviceProviderReviews: ServiceProviderReviewsResult;
  serviceProviders: Array<ServiceProvider>;
  user: User;
  userActions: Array<UserAction>;
  userInvites: Array<UserInvite>;
  users: UsersResult;
};


export type QueryAchievementFunnelStatsArgs = {
  input: AchievementFunnelStatsInput;
};


export type QueryActionCommentAttachmentsArgs = {
  input: ActionCommentAttachmentsInput;
};


export type QueryActionCommentsArgs = {
  input: ActionCommentsInput;
};


export type QueryActionStatsArgs = {
  input: ActionStatsInput;
};


export type QueryCompaniesArgs = {
  input?: InputMaybe<CompaniesInput>;
};


export type QueryCompanyArgs = {
  input?: InputMaybe<CompanyInput>;
};


export type QueryCompanyActionArgs = {
  input: CompanyActionInput;
};


export type QueryCompanyActionsArgs = {
  input?: InputMaybe<CompanyActionsInput>;
};


export type QueryEventArgs = {
  input: EventInput;
};


export type QueryEventParticipantsArgs = {
  input: EventParticipantsInput;
};


export type QueryEventStatsArgs = {
  input?: InputMaybe<EventStatsInput>;
};


export type QueryEventsArgs = {
  input?: InputMaybe<EventsInput>;
};


export type QueryQualifiedCompaniesArgs = {
  input: QualifiedCompaniesInput;
};


export type QuerySearchCompanyArgs = {
  input: SearchCompanyInput;
};


export type QuerySearchUserArgs = {
  input: SearchUserInput;
};


export type QueryServiceProviderReviewsArgs = {
  input?: InputMaybe<ServiceProviderReviewsInput>;
};


export type QueryServiceProvidersArgs = {
  input?: InputMaybe<ServiceProvidersInput>;
};


export type QueryUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type QueryUserActionsArgs = {
  input?: InputMaybe<UserActionsInput>;
};


export type QueryUserInvitesArgs = {
  input?: InputMaybe<UserInvitesInput>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UsersInput>;
};

export type RegisterUserCompanyInput = {
  country: Scalars['String'];
  employeeCount: Scalars['Int'];
  fundSize?: InputMaybe<Scalars['Int']>;
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type RegisterUserInput = {
  /** If no company is provided, it is required that an invite for the provided email exists */
  company?: InputMaybe<RegisterUserCompanyInput>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  jobRole?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
};

export type RemoveEventParticipantInput = {
  eventId: Scalars['String'];
  isExternal?: InputMaybe<Scalars['Boolean']>;
  /** Only admin users are allowed to remove other users from an event */
  userId?: InputMaybe<Scalars['String']>;
};

export type RequestPasswordResetInput = {
  email: Scalars['String'];
};

export type ResendEmailVerificationInput = {
  /** NOTE: Only admins are allowed to input an userId other then their own */
  userId?: InputMaybe<Scalars['String']>;
};

export type SearchCompanyInput = {
  query: Scalars['String'];
};

export type SearchUserInput = {
  filter?: InputMaybe<SearchUserInputFilter>;
  query: Scalars['String'];
};

export type SearchUserInputFilter = {
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
};

export type ServiceProvider = {
  __typename?: 'ServiceProvider';
  averageRating?: Maybe<Scalars['Float']>;
  /** @deprecated Use `tags`. */
  certifications: Array<Tag>;
  description?: Maybe<Scalars['JSON']>;
  email?: Maybe<Scalars['String']>;
  featureCta?: Maybe<Scalars['String']>;
  featureDescription?: Maybe<Scalars['String']>;
  featureImage?: Maybe<ContentAsset>;
  featureTitle?: Maybe<Scalars['String']>;
  freeDemo: Scalars['Boolean'];
  highestPrice?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  /** @deprecated Use `tags`. */
  languages: Array<Tag>;
  logo?: Maybe<ContentAsset>;
  lowestPrice?: Maybe<Scalars['Int']>;
  memberId?: Maybe<Scalars['String']>;
  /** @deprecated Use `tags`. */
  model: Array<Tag>;
  name: Scalars['String'];
  reviewsCount: Scalars['Int'];
  /** @deprecated Use `tags`. */
  services: Array<Tag>;
  size?: Maybe<Scalars['String']>;
  /** @deprecated Use `tags`. */
  supplyChainComplexity: Array<Tag>;
  tags: Array<Tag>;
  website?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type ServiceProviderFilter = {
  __typename?: 'ServiceProviderFilter';
  attribute: Scalars['String'];
  condition: ServiceProviderFilterCondition;
  id: Scalars['ID'];
  label: Scalars['String'];
  question?: Maybe<Scalars['String']>;
  type: ServiceProviderFilterType;
  values?: Maybe<Array<ServiceProviderFilterValue>>;
};

export enum ServiceProviderFilterCondition {
  CONTAINS = 'CONTAINS',
  CONTAINS_ALL = 'CONTAINS_ALL',
  VALUE_BELOW = 'VALUE_BELOW'
}

export enum ServiceProviderFilterType {
  MULTISELECT = 'MULTISELECT',
  SELECT = 'SELECT'
}

export type ServiceProviderFilterValue = {
  __typename?: 'ServiceProviderFilterValue';
  id: Scalars['ID'];
  integerValue?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  stringValue?: Maybe<Scalars['String']>;
  type: ServiceProviderFilterValueType;
};

export enum ServiceProviderFilterValueType {
  INTEGER = 'INTEGER',
  STRING = 'STRING'
}

export type ServiceProviderList = {
  __typename?: 'ServiceProviderList';
  featured: Array<ServiceProvider>;
  filters: Array<ServiceProviderFilter>;
  id: Scalars['ID'];
  items: Array<ServiceProvider>;
  title: Scalars['String'];
};

export type ServiceProviderReview = {
  __typename?: 'ServiceProviderReview';
  /** ServiceProviderReview's can be anonymous so we might not always get a user */
  author?: Maybe<User>;
  cons: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isAnonymous: Scalars['Boolean'];
  price?: Maybe<Scalars['Int']>;
  pros: Array<Scalars['String']>;
  rating: Scalars['Float'];
  review: Scalars['String'];
  serviceProviderContentId: Scalars['String'];
};

export type ServiceProviderReviewsFilterInput = {
  isApproved?: InputMaybe<Scalars['Boolean']>;
  serviceProviderContentId?: InputMaybe<Scalars['String']>;
};

export type ServiceProviderReviewsInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<ServiceProviderReviewsFilterInput>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ServiceProviderReviewsResult = {
  __typename?: 'ServiceProviderReviewsResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<ServiceProviderReview>;
};

export type ServiceProvidersInput = {
  filter?: InputMaybe<ServiceProvidersInputFilter>;
};

export type ServiceProvidersInputFilter = {
  serviceProviderContentIds?: InputMaybe<Array<Scalars['String']>>;
};

export type Tag = {
  __typename?: 'Tag';
  categoryId: Scalars['String'];
  help?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sortWeight?: Maybe<Scalars['Int']>;
};

export type TriggerDeploymentInput = {
  eventType: Scalars['String'];
  repoName: Scalars['String'];
};

export type UpdateActionCommentInput = {
  attachments?: InputMaybe<Array<CreateActionCommentAttachmentInput>>;
  authorId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  aboutSections?: InputMaybe<Array<CompanyAboutSectionInput>>;
  campaignContribution?: InputMaybe<Scalars['String']>;
  campaignFiles?: InputMaybe<Array<FileInput>>;
  campaignGoals?: InputMaybe<Scalars['String']>;
  companyId?: InputMaybe<Scalars['ID']>;
  country?: InputMaybe<Scalars['String']>;
  crmId?: InputMaybe<Scalars['String']>;
  employeeCount?: InputMaybe<Scalars['Int']>;
  fundSize?: InputMaybe<Scalars['Int']>;
  internalDescription?: InputMaybe<Scalars['String']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  micrositeSlug?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  programContentId?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<CompanySubscriptionType>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateEventInput = {
  description?: InputMaybe<Scalars['String']>;
  end?: InputMaybe<Scalars['DateTime']>;
  eventId: Scalars['ID'];
  /** Will be ignored when passing a `recurrenceStart` since it is a global prop on the main event */
  initialInviteStatus?: InputMaybe<EventParticipantStatus>;
  isCancelled?: InputMaybe<Scalars['Boolean']>;
  recurrenceRule?: InputMaybe<Scalars['String']>;
  /**
   * Creates/Updates an override for a single instance of a recurring event
   * by referecing the `start` of the original instance
   */
  recurrenceStart?: InputMaybe<Scalars['DateTime']>;
  /** Will be ignored when passing a `recurrenceStart` since it is a global prop on the main event */
  remindersBeforeStart?: InputMaybe<Array<Scalars['Int']>>;
  start?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  videoConferenceUrl?: InputMaybe<Scalars['String']>;
};

export type UpdateEventParticipantStatusInput = {
  eventId: Scalars['String'];
  isExternal?: InputMaybe<Scalars['Boolean']>;
  notes?: InputMaybe<Scalars['String']>;
  /** Only admins can set a status other than `USER_RSVP_ACCEPTED` and `USER_RSVP_DECLINED` */
  status: EventParticipantStatus;
  /** Only admins can change the status for participants other than themselves */
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateServiceProviderReviewInput = {
  authorId?: InputMaybe<Scalars['ID']>;
  cons?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  isAnonymous?: InputMaybe<Scalars['Boolean']>;
  isApproved?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Int']>;
  pros?: InputMaybe<Array<Scalars['String']>>;
  rating?: InputMaybe<Scalars['Float']>;
  review?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  companyId?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  jobRole?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  sortWeight?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  completedActions: Array<UserAction>;
  country: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  jobRole?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  sortWeight: Scalars['Int'];
};

export type UserAction = {
  __typename?: 'UserAction';
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  editedAt: Scalars['DateTime'];
  expiredAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier generated using the contentId and userId as long as the action has not expired */
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  values?: Maybe<Scalars['JSON']>;
};

export type UserActionsInput = {
  filter?: InputMaybe<UserActionsInputFilter>;
};

export type UserActionsInputFilter = {
  isCompleted?: InputMaybe<Scalars['Boolean']>;
  isExpired?: InputMaybe<Scalars['Boolean']>;
};

export type UserInput = {
  userId: Scalars['ID'];
};

export type UserInvite = {
  __typename?: 'UserInvite';
  email: Scalars['String'];
  id: Scalars['ID'];
  user?: Maybe<User>;
  userRole: Scalars['String'];
};

export type UserInvitesFilterInput = {
  companyId?: InputMaybe<Scalars['String']>;
};

export type UserInvitesInput = {
  /**
   * Admin-only: Allows filtering by company.
   * Default: Company of the requesting user.
   */
  filter?: InputMaybe<UserInvitesFilterInput>;
};

export type UsersInput = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<UsersInputFilter>;
  take?: InputMaybe<Scalars['Int']>;
};

export type UsersInputFilter = {
  companyId?: InputMaybe<Scalars['ID']>;
  includeDeleted?: InputMaybe<Scalars['Boolean']>;
  userIds?: InputMaybe<Array<Scalars['String']>>;
  userRoles?: InputMaybe<Array<Scalars['String']>>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<User>;
};

export type ActionCommentAttachmentFragment = { __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string };

export type ActionCommentFragment = { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null };

export type CategoryFragment = { __typename?: 'Category', id: string, name?: string | null };

export type CompanyAchievementMiniFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }> };

export type CompanyAchievementFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, micrositeUrl?: string | null, minCompletedCompanyActionsCount?: number | null, name: string, editableCompanyProperties: Array<string>, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }> };

export type CompanyActionDetailsFragment = { __typename?: 'CompanyAction', id: string, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string, title: string, featured: Array<{ __typename?: 'ServiceProvider', featureCta?: string | null, featureDescription?: string | null, featureTitle?: string | null, id: string, featureImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null }>, filters: Array<{ __typename?: 'ServiceProviderFilter', attribute: string, condition: ServiceProviderFilterCondition, id: string, label: string, question?: string | null, type: ServiceProviderFilterType, values?: Array<{ __typename?: 'ServiceProviderFilterValue', id: string, integerValue?: number | null, label: string, stringValue?: string | null, type: ServiceProviderFilterValueType }> | null }>, items: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, description?: any | null, email?: string | null, freeDemo: boolean, highestPrice?: number | null, id: string, isPrivate: boolean, lowestPrice?: number | null, memberId?: string | null, name: string, reviewsCount: number, size?: string | null, year?: number | null, website?: string | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, tags: Array<{ __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null }> }> } | null };

export type CompanyActionListItemFragment = { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesDoingCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, notes?: string | null, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesDoing: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string } | null };

export type CompanyActionRequirementFragment = { __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string };

export type CompanyFragment = { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> };

export type EventParticipantFragment = { __typename?: 'EventParticipant', id: string, isExternal: boolean, notes?: string | null, status: EventParticipantStatus, user: { __typename?: 'ExternalUser', email: string, id: string } | { __typename?: 'User', deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, picture?: string | null, company?: { __typename?: 'Company', id: string, name?: string | null, logoUrl?: string | null } | null } };

export type EventWithParticipantsFragment = { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> };

export type EventFragment = { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null };

export type ExternalUserFragment = { __typename?: 'ExternalUser', email: string, firstName?: string | null, id: string, lastName?: string | null };

export type FeaturedServiceProviderFragment = { __typename?: 'ServiceProvider', featureCta?: string | null, featureDescription?: string | null, featureTitle?: string | null, id: string, featureImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null };

export type ServiceProviderFilterFragment = { __typename?: 'ServiceProviderFilter', attribute: string, condition: ServiceProviderFilterCondition, id: string, label: string, question?: string | null, type: ServiceProviderFilterType, values?: Array<{ __typename?: 'ServiceProviderFilterValue', id: string, integerValue?: number | null, label: string, stringValue?: string | null, type: ServiceProviderFilterValueType }> | null };

export type ServiceProviderListFragment = { __typename?: 'ServiceProviderList', id: string, title: string, featured: Array<{ __typename?: 'ServiceProvider', featureCta?: string | null, featureDescription?: string | null, featureTitle?: string | null, id: string, featureImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null }>, filters: Array<{ __typename?: 'ServiceProviderFilter', attribute: string, condition: ServiceProviderFilterCondition, id: string, label: string, question?: string | null, type: ServiceProviderFilterType, values?: Array<{ __typename?: 'ServiceProviderFilterValue', id: string, integerValue?: number | null, label: string, stringValue?: string | null, type: ServiceProviderFilterValueType }> | null }>, items: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, description?: any | null, email?: string | null, freeDemo: boolean, highestPrice?: number | null, id: string, isPrivate: boolean, lowestPrice?: number | null, memberId?: string | null, name: string, reviewsCount: number, size?: string | null, year?: number | null, website?: string | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, tags: Array<{ __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null }> }> };

export type ServiceProviderReviewFragment = { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, isAnonymous: boolean, price?: number | null, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null };

export type ServiceProviderFragment = { __typename?: 'ServiceProvider', averageRating?: number | null, description?: any | null, email?: string | null, freeDemo: boolean, highestPrice?: number | null, id: string, isPrivate: boolean, lowestPrice?: number | null, memberId?: string | null, name: string, reviewsCount: number, size?: string | null, year?: number | null, website?: string | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, tags: Array<{ __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null }> };

export type TagFragment = { __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null };

export type UserActionFragment = { __typename?: 'UserAction', id: string, notes?: string | null, contentId: string, completedAt?: any | null, createdAt: any, values?: any | null };

export type UserAvatarFragment = { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null };

export type UserInviteFragment = { __typename?: 'UserInvite', email: string, userRole: string, id: string, user?: { __typename?: 'User', id: string, email: string } | null };

export type UserFragment = { __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null };

export type AddEventParticipantMutationVariables = Exact<{
  input: AddEventParticipantInput;
}>;


export type AddEventParticipantMutation = { __typename?: 'Mutation', addEventParticipant: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> } };

export type AddExternalEventParticipantMutationVariables = Exact<{
  input: AddExternalEventParticipantInput;
}>;


export type AddExternalEventParticipantMutation = { __typename?: 'Mutation', addExternalEventParticipant: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> } };

export type CompleteCompanyActionRequirementMutationVariables = Exact<{
  input: CompleteCompanyActionRequirementInput;
}>;


export type CompleteCompanyActionRequirementMutation = { __typename?: 'Mutation', completeCompanyActionRequirement: { __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string } };

export type CompleteCompanyActionMutationVariables = Exact<{
  input: CompleteCompanyActionInput;
}>;


export type CompleteCompanyActionMutation = { __typename?: 'Mutation', completeCompanyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesDoingCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, notes?: string | null, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesDoing: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string } | null } };

export type CompleteUserActionMutationVariables = Exact<{
  input: CompleteUserActionInput;
}>;


export type CompleteUserActionMutation = { __typename?: 'Mutation', completeUserAction: { __typename?: 'UserAction', id: string, notes?: string | null, contentId: string, completedAt?: any | null, createdAt: any, values?: any | null } };

export type CreateActionCommentExportMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateActionCommentExportMutation = { __typename?: 'Mutation', createActionCommentExport: string };

export type CreateActionCommentMutationVariables = Exact<{
  input: CreateActionCommentInput;
}>;


export type CreateActionCommentMutation = { __typename?: 'Mutation', createActionComment: { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null } };

export type CreateCompanyExportMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCompanyExportMutation = { __typename?: 'Mutation', createCompanyExport: string };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> } };

export type CreateEventParticipantExportMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateEventParticipantExportMutation = { __typename?: 'Mutation', createEventParticipantExport: string };

export type CreateEventTokenMutationVariables = Exact<{
  input: CreateEventTokenInput;
}>;


export type CreateEventTokenMutation = { __typename?: 'Mutation', createEventToken?: string | null };

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type CreateEventMutation = { __typename?: 'Mutation', createEvent: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> } };

export type CreateServiceProviderReviewMutationVariables = Exact<{
  input: CreateServiceProviderReviewInput;
}>;


export type CreateServiceProviderReviewMutation = { __typename?: 'Mutation', createServiceProviderReview: { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, isAnonymous: boolean, price?: number | null, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null } };

export type CreateUserExportMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateUserExportMutation = { __typename?: 'Mutation', createUserExport: string };

export type CreateUserInviteMutationVariables = Exact<{
  input: CreateUserInviteInput;
}>;


export type CreateUserInviteMutation = { __typename?: 'Mutation', createUserInvite: { __typename?: 'UserInvite', email: string, userRole: string } };

export type DeleteActionCommentMutationVariables = Exact<{
  input: DeleteActionCommentInput;
}>;


export type DeleteActionCommentMutation = { __typename?: 'Mutation', deleteActionComment: boolean };

export type DeleteCompanyMutationVariables = Exact<{
  input: DeleteCompanyInput;
}>;


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> } };

export type DeleteServiceProviderReviewMutationVariables = Exact<{
  input: DeleteServiceProviderReviewInput;
}>;


export type DeleteServiceProviderReviewMutation = { __typename?: 'Mutation', deleteServiceProviderReview: { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, isAnonymous: boolean, price?: number | null, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null } };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null } };

export type PlanCompanyActionMutationVariables = Exact<{
  input: PlanCompanyActionInput;
}>;


export type PlanCompanyActionMutation = { __typename?: 'Mutation', planCompanyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesDoingCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, notes?: string | null, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesDoing: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string } | null } };

export type ProcessEventInviteTokenMutationVariables = Exact<{
  input: ProcessEventInviteTokenInput;
}>;


export type ProcessEventInviteTokenMutation = { __typename?: 'Mutation', processEventInviteToken: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null } };

export type ProcessEventRsvpTokenMutationVariables = Exact<{
  input: ProcessEventRsvpTokenInput;
}>;


export type ProcessEventRsvpTokenMutation = { __typename?: 'Mutation', processEventRSVPToken: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null } };

export type PurgeCacheMutationVariables = Exact<{ [key: string]: never; }>;


export type PurgeCacheMutation = { __typename?: 'Mutation', purgeCache: boolean };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null } };

export type RemoveEventParticipantMutationVariables = Exact<{
  input: RemoveEventParticipantInput;
}>;


export type RemoveEventParticipantMutation = { __typename?: 'Mutation', removeEventParticipant: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> } };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type ResendEmailVerificationMutationVariables = Exact<{
  input: ResendEmailVerificationInput;
}>;


export type ResendEmailVerificationMutation = { __typename?: 'Mutation', resendEmailVerification: boolean };

export type TriggerDeploymentMutationVariables = Exact<{
  input: TriggerDeploymentInput;
}>;


export type TriggerDeploymentMutation = { __typename?: 'Mutation', triggerDeployment?: boolean | null };

export type UpdateActionCommentMutationVariables = Exact<{
  input: UpdateActionCommentInput;
}>;


export type UpdateActionCommentMutation = { __typename?: 'Mutation', updateActionComment: { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> } };

export type UpdateEventParticipantStatusMutationVariables = Exact<{
  input: UpdateEventParticipantStatusInput;
}>;


export type UpdateEventParticipantStatusMutation = { __typename?: 'Mutation', updateEventParticipantStatus: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> } };

export type UpdateEventMutationVariables = Exact<{
  input: UpdateEventInput;
}>;


export type UpdateEventMutation = { __typename?: 'Mutation', updateEvent: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> } };

export type UpdateServiceProviderReviewMutationVariables = Exact<{
  input: UpdateServiceProviderReviewInput;
}>;


export type UpdateServiceProviderReviewMutation = { __typename?: 'Mutation', updateServiceProviderReview: { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, isAnonymous: boolean, price?: number | null, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null } };

export type ActionCommentAttachmentsQueryVariables = Exact<{
  input: ActionCommentAttachmentsInput;
}>;


export type ActionCommentAttachmentsQuery = { __typename?: 'Query', actionCommentAttachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }> };

export type ActionCommentsQueryVariables = Exact<{
  input: ActionCommentsInput;
}>;


export type ActionCommentsQuery = { __typename?: 'Query', actionComments: Array<{ __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null }> };

export type CompaniesQueryVariables = Exact<{
  input?: InputMaybe<CompaniesInput>;
}>;


export type CompaniesQuery = { __typename?: 'Query', companies: { __typename?: 'CompaniesResult', cursor?: string | null, items: Array<{ __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> }> } };

export type CompanyAchievementsMiniQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAchievementsMiniQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }> }> } } };

export type CompanyAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAchievementsQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, micrositeUrl?: string | null, minCompletedCompanyActionsCount?: number | null, name: string, editableCompanyProperties: Array<string>, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }> }> } } };

export type CompanyActionDetailsQueryVariables = Exact<{
  input: CompanyActionInput;
}>;


export type CompanyActionDetailsQuery = { __typename?: 'Query', companyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesDoingCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, notes?: string | null, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesDoing: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string } | null } };

export type CompanyActionExtendedDetailsQueryVariables = Exact<{
  input: CompanyActionInput;
}>;


export type CompanyActionExtendedDetailsQuery = { __typename?: 'Query', companyAction: { __typename?: 'CompanyAction', id: string, categories: Array<{ __typename?: 'Category', name?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string, title: string, featured: Array<{ __typename?: 'ServiceProvider', featureCta?: string | null, featureDescription?: string | null, featureTitle?: string | null, id: string, featureImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null }>, filters: Array<{ __typename?: 'ServiceProviderFilter', attribute: string, condition: ServiceProviderFilterCondition, id: string, label: string, question?: string | null, type: ServiceProviderFilterType, values?: Array<{ __typename?: 'ServiceProviderFilterValue', id: string, integerValue?: number | null, label: string, stringValue?: string | null, type: ServiceProviderFilterValueType }> | null }>, items: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, description?: any | null, email?: string | null, freeDemo: boolean, highestPrice?: number | null, id: string, isPrivate: boolean, lowestPrice?: number | null, memberId?: string | null, name: string, reviewsCount: number, size?: string | null, year?: number | null, website?: string | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, tags: Array<{ __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null }> }> } | null } };

export type CompanyActionsListQueryVariables = Exact<{
  input?: InputMaybe<CompanyActionsInput>;
}>;


export type CompanyActionsListQuery = { __typename?: 'Query', companyActions: Array<{ __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesDoingCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, notes?: string | null, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesDoing: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, serviceProviderList?: { __typename?: 'ServiceProviderList', id: string } | null }> };

export type CompanyQueryVariables = Exact<{
  input?: InputMaybe<CompanyInput>;
}>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> } };

export type EventParticipantsQueryVariables = Exact<{
  input: EventParticipantsInput;
}>;


export type EventParticipantsQuery = { __typename?: 'Query', eventParticipants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, notes?: string | null, status: EventParticipantStatus, user: { __typename?: 'ExternalUser', email: string, id: string } | { __typename?: 'User', deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, picture?: string | null, company?: { __typename?: 'Company', id: string, name?: string | null, logoUrl?: string | null } | null } }> };

export type EventQueryVariables = Exact<{
  input: EventInput;
}>;


export type EventQuery = { __typename?: 'Query', event: { __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null } };

export type EventsQueryVariables = Exact<{
  input?: InputMaybe<EventsInput>;
}>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'Event', category: EventCategory, description?: string | null, end: any, id: string, initialInviteStatus?: EventParticipantStatus | null, nextOccurrenceEnd?: any | null, nextOccurrenceStart?: any | null, participantsAwaitingAdminApprovalCount: number, participantsAwaitingUserRSVPCount: number, participantsUserRSVPAcceptedCount: number, participantsUserRSVPDeclinedCount: number, participationStatus?: EventParticipantStatus | null, recurrenceRule?: string | null, recurrenceRuleReadable?: string | null, start: any, status: EventStatus, title: string, videoConferenceUrl?: string | null, participants: Array<{ __typename?: 'EventParticipant', id: string, isExternal: boolean, user: { __typename?: 'ExternalUser' } | { __typename?: 'User', id: string, company?: { __typename?: 'Company', id: string, logoUrl?: string | null } | null } }> }> };

export type SearchCompanyQueryVariables = Exact<{
  input: SearchCompanyInput;
}>;


export type SearchCompanyQuery = { __typename?: 'Query', searchCompany: Array<{ __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, fundSize?: number | null, employeeCount: number, id: string, internalDescription?: string | null, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', name: string }> }> };

export type SearchUserQueryVariables = Exact<{
  input: SearchUserInput;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null }> };

export type ServiceProviderListsQueryVariables = Exact<{ [key: string]: never; }>;


export type ServiceProviderListsQuery = { __typename?: 'Query', serviceProviderLists: Array<{ __typename?: 'ServiceProviderList', id: string, title: string, featured: Array<{ __typename?: 'ServiceProvider', featureCta?: string | null, featureDescription?: string | null, featureTitle?: string | null, id: string, featureImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null }>, filters: Array<{ __typename?: 'ServiceProviderFilter', attribute: string, condition: ServiceProviderFilterCondition, id: string, label: string, question?: string | null, type: ServiceProviderFilterType, values?: Array<{ __typename?: 'ServiceProviderFilterValue', id: string, integerValue?: number | null, label: string, stringValue?: string | null, type: ServiceProviderFilterValueType }> | null }>, items: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, description?: any | null, email?: string | null, freeDemo: boolean, highestPrice?: number | null, id: string, isPrivate: boolean, lowestPrice?: number | null, memberId?: string | null, name: string, reviewsCount: number, size?: string | null, year?: number | null, website?: string | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, tags: Array<{ __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null }> }> }> };

export type ServiceProviderReviewsQueryVariables = Exact<{
  input: ServiceProviderReviewsInput;
}>;


export type ServiceProviderReviewsQuery = { __typename?: 'Query', serviceProviderReviews: { __typename?: 'ServiceProviderReviewsResult', cursor?: string | null, items: Array<{ __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, isAnonymous: boolean, price?: number | null, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null, company?: { __typename?: 'Company', name?: string | null } | null } | null }> } };

export type ServiceProvidersQueryVariables = Exact<{
  input?: InputMaybe<ServiceProvidersInput>;
}>;


export type ServiceProvidersQuery = { __typename?: 'Query', serviceProviders: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, description?: any | null, email?: string | null, freeDemo: boolean, highestPrice?: number | null, id: string, isPrivate: boolean, lowestPrice?: number | null, memberId?: string | null, name: string, reviewsCount: number, size?: string | null, year?: number | null, website?: string | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, tags: Array<{ __typename?: 'Tag', categoryId: string, help?: string | null, id: string, name?: string | null, sortWeight?: number | null }> }> };

export type UserActionsListQueryVariables = Exact<{
  input?: InputMaybe<UserActionsInput>;
}>;


export type UserActionsListQuery = { __typename?: 'Query', userActions: Array<{ __typename?: 'UserAction', id: string, notes?: string | null, contentId: string, completedAt?: any | null, createdAt: any, values?: any | null }> };

export type UserInvitesQueryVariables = Exact<{
  input?: InputMaybe<UserInvitesInput>;
}>;


export type UserInvitesQuery = { __typename?: 'Query', userInvites: Array<{ __typename?: 'UserInvite', email: string, userRole: string, id: string, user?: { __typename?: 'User', id: string, email: string } | null }> };

export type UserQueryVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null } };

export type UsersQueryVariables = Exact<{
  input?: InputMaybe<UsersInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResult', cursor?: string | null, items: Array<{ __typename?: 'User', country: string, deletedAt?: any | null, email: string, firstName: string, jobRole?: string | null, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType, employeeCount: number, fundSize?: number | null, tags: Array<{ __typename?: 'CompanyTag', name: string }> } | null }> } };

export const ActionCommentAttachmentFragmentDoc = gql`
    fragment ActionCommentAttachment on ActionCommentAttachment {
  fileName
  fileSize
  id
  mimeType
  source
}
    `;
export const UserAvatarFragmentDoc = gql`
    fragment UserAvatar on User {
  email
  firstName
  id
  picture
  company {
    name
  }
}
    `;
export const ActionCommentFragmentDoc = gql`
    fragment ActionComment on ActionComment {
  attachments {
    ...ActionCommentAttachment
  }
  author {
    ...UserAvatar
  }
  id
  message
  createdAt
}
    ${ActionCommentAttachmentFragmentDoc}
${UserAvatarFragmentDoc}`;
export const CompanyAchievementMiniFragmentDoc = gql`
    fragment CompanyAchievementMini on CompanyAchievement {
  completedCompanyActionsCount
  completedRequiredCompanyActionsCount
  contentId
  minCompletedCompanyActionsCount
  name
  recommendedActions {
    id
    title
  }
  requiredActions {
    id
    title
  }
}
    `;
export const CompanyAchievementFragmentDoc = gql`
    fragment CompanyAchievement on CompanyAchievement {
  completedCompanyActionsCount
  completedRequiredCompanyActionsCount
  contentId
  micrositeUrl
  minCompletedCompanyActionsCount
  name
  recommendedActions {
    id
    title
    completedAt
    contentId
  }
  requiredActions {
    id
    title
    completedAt
    contentId
  }
  editableCompanyProperties
}
    `;
export const FeaturedServiceProviderFragmentDoc = gql`
    fragment FeaturedServiceProvider on ServiceProvider {
  featureCta
  featureDescription
  featureImage {
    id
    url
  }
  featureTitle
  id
}
    `;
export const ServiceProviderFilterFragmentDoc = gql`
    fragment ServiceProviderFilter on ServiceProviderFilter {
  attribute
  condition
  id
  label
  question
  type
  values {
    id
    integerValue
    label
    stringValue
    type
  }
}
    `;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  categoryId
  help
  id
  name
  sortWeight
}
    `;
export const ServiceProviderFragmentDoc = gql`
    fragment ServiceProvider on ServiceProvider {
  averageRating
  description
  email
  freeDemo
  highestPrice
  id
  isPrivate
  logo {
    id
    url
  }
  lowestPrice
  memberId
  name
  reviewsCount
  size
  tags {
    ...Tag
  }
  year
  website
}
    ${TagFragmentDoc}`;
export const ServiceProviderListFragmentDoc = gql`
    fragment ServiceProviderList on ServiceProviderList {
  featured {
    ...FeaturedServiceProvider
  }
  filters {
    ...ServiceProviderFilter
  }
  id
  items {
    ...ServiceProvider
  }
  title
}
    ${FeaturedServiceProviderFragmentDoc}
${ServiceProviderFilterFragmentDoc}
${ServiceProviderFragmentDoc}`;
export const CompanyActionDetailsFragmentDoc = gql`
    fragment CompanyActionDetails on CompanyAction {
  id
  categories {
    name
    id
  }
  serviceProviderList {
    ...ServiceProviderList
  }
}
    ${ServiceProviderListFragmentDoc}`;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
}
    `;
export const CompanyActionRequirementFragmentDoc = gql`
    fragment CompanyActionRequirement on CompanyActionRequirement {
  contentId
  title
  completedAt
  description
  id
}
    `;
export const CompanyActionListItemFragmentDoc = gql`
    fragment CompanyActionListItem on CompanyAction {
  categories {
    ...Category
  }
  commentAttachmentCount
  commentCount
  companiesDoingCount
  completedAt
  contentId
  heroImage {
    id
    url
  }
  id
  impactValue
  notes
  plannedAt
  recentCompaniesDoing(limit: 3) {
    id
    logoUrl
    name
  }
  recommendedForCompanyAchievementIds
  requiredForCompanyAchievementIds
  requirements {
    ...CompanyActionRequirement
  }
  serviceProviderList {
    id
  }
  title
}
    ${CategoryFragmentDoc}
${CompanyActionRequirementFragmentDoc}`;
export const CompanyFragmentDoc = gql`
    fragment Company on Company {
  aboutSections {
    heading
    imageUrl
    text
  }
  campaignContribution
  campaignFiles {
    name
    url
  }
  campaignGoals
  country
  crmId
  deletedAt
  fundSize
  employeeCount
  id
  internalDescription
  logoUrl
  micrositeSlug
  name
  program {
    contentId
    name
  }
  subscriptionType
  tags {
    name
  }
  websiteUrl
}
    `;
export const EventParticipantFragmentDoc = gql`
    fragment EventParticipant on EventParticipant {
  id
  isExternal
  notes
  status
  user {
    ... on ExternalUser {
      email
      id
    }
    ... on User {
      company {
        id
        name
        logoUrl
      }
      deletedAt
      email
      firstName
      id
      lastName
      picture
    }
  }
}
    `;
export const EventFragmentDoc = gql`
    fragment Event on Event {
  category
  description
  end
  id
  initialInviteStatus
  nextOccurrenceEnd
  nextOccurrenceStart
  participantsAwaitingAdminApprovalCount
  participantsAwaitingUserRSVPCount
  participantsUserRSVPAcceptedCount
  participantsUserRSVPDeclinedCount
  participationStatus
  recurrenceRule
  recurrenceRuleReadable
  start
  status
  title
  videoConferenceUrl
}
    `;
export const EventWithParticipantsFragmentDoc = gql`
    fragment EventWithParticipants on Event {
  ...Event
  participants(filter: {status: USER_RSVP_ACCEPTED}) {
    id
    isExternal
    user {
      ... on User {
        company {
          id
          logoUrl
        }
        id
      }
    }
  }
}
    ${EventFragmentDoc}`;
export const ExternalUserFragmentDoc = gql`
    fragment ExternalUser on ExternalUser {
  email
  firstName
  id
  lastName
}
    `;
export const ServiceProviderReviewFragmentDoc = gql`
    fragment ServiceProviderReview on ServiceProviderReview {
  author {
    ...UserAvatar
  }
  cons
  createdAt
  id
  isAnonymous
  price
  pros
  rating
  review
  serviceProviderContentId
}
    ${UserAvatarFragmentDoc}`;
export const UserActionFragmentDoc = gql`
    fragment UserAction on UserAction {
  id
  notes
  contentId
  completedAt
  createdAt
  values
}
    `;
export const UserInviteFragmentDoc = gql`
    fragment UserInvite on UserInvite {
  email
  userRole
  id
  user {
    id
    email
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  company {
    id
    logoUrl
    name
    programContentId
    subscriptionType
    employeeCount
    fundSize
    tags {
      name
    }
  }
  country
  deletedAt
  email
  firstName
  jobRole
  id
  lastName
  phone
  picture
  roles
  sortWeight
}
    `;
export const AddEventParticipantDocument = gql`
    mutation addEventParticipant($input: AddEventParticipantInput!) {
  addEventParticipant(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useAddEventParticipantMutation() {
  return Urql.useMutation<AddEventParticipantMutation, AddEventParticipantMutationVariables>(AddEventParticipantDocument);
};
export const AddExternalEventParticipantDocument = gql`
    mutation addExternalEventParticipant($input: AddExternalEventParticipantInput!) {
  addExternalEventParticipant(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useAddExternalEventParticipantMutation() {
  return Urql.useMutation<AddExternalEventParticipantMutation, AddExternalEventParticipantMutationVariables>(AddExternalEventParticipantDocument);
};
export const CompleteCompanyActionRequirementDocument = gql`
    mutation completeCompanyActionRequirement($input: CompleteCompanyActionRequirementInput!) {
  completeCompanyActionRequirement(input: $input) {
    ...CompanyActionRequirement
  }
}
    ${CompanyActionRequirementFragmentDoc}`;

export function useCompleteCompanyActionRequirementMutation() {
  return Urql.useMutation<CompleteCompanyActionRequirementMutation, CompleteCompanyActionRequirementMutationVariables>(CompleteCompanyActionRequirementDocument);
};
export const CompleteCompanyActionDocument = gql`
    mutation completeCompanyAction($input: CompleteCompanyActionInput!) {
  completeCompanyAction(input: $input) {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function useCompleteCompanyActionMutation() {
  return Urql.useMutation<CompleteCompanyActionMutation, CompleteCompanyActionMutationVariables>(CompleteCompanyActionDocument);
};
export const CompleteUserActionDocument = gql`
    mutation completeUserAction($input: CompleteUserActionInput!) {
  completeUserAction(input: $input) {
    ...UserAction
  }
}
    ${UserActionFragmentDoc}`;

export function useCompleteUserActionMutation() {
  return Urql.useMutation<CompleteUserActionMutation, CompleteUserActionMutationVariables>(CompleteUserActionDocument);
};
export const CreateActionCommentExportDocument = gql`
    mutation createActionCommentExport {
  createActionCommentExport
}
    `;

export function useCreateActionCommentExportMutation() {
  return Urql.useMutation<CreateActionCommentExportMutation, CreateActionCommentExportMutationVariables>(CreateActionCommentExportDocument);
};
export const CreateActionCommentDocument = gql`
    mutation createActionComment($input: CreateActionCommentInput!) {
  createActionComment(input: $input) {
    ...ActionComment
  }
}
    ${ActionCommentFragmentDoc}`;

export function useCreateActionCommentMutation() {
  return Urql.useMutation<CreateActionCommentMutation, CreateActionCommentMutationVariables>(CreateActionCommentDocument);
};
export const CreateCompanyExportDocument = gql`
    mutation createCompanyExport {
  createCompanyExport
}
    `;

export function useCreateCompanyExportMutation() {
  return Urql.useMutation<CreateCompanyExportMutation, CreateCompanyExportMutationVariables>(CreateCompanyExportDocument);
};
export const CreateCompanyDocument = gql`
    mutation createCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useCreateCompanyMutation() {
  return Urql.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument);
};
export const CreateEventParticipantExportDocument = gql`
    mutation createEventParticipantExport {
  createEventParticipantExport
}
    `;

export function useCreateEventParticipantExportMutation() {
  return Urql.useMutation<CreateEventParticipantExportMutation, CreateEventParticipantExportMutationVariables>(CreateEventParticipantExportDocument);
};
export const CreateEventTokenDocument = gql`
    mutation createEventToken($input: CreateEventTokenInput!) {
  createEventToken(input: $input)
}
    `;

export function useCreateEventTokenMutation() {
  return Urql.useMutation<CreateEventTokenMutation, CreateEventTokenMutationVariables>(CreateEventTokenDocument);
};
export const CreateEventDocument = gql`
    mutation createEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useCreateEventMutation() {
  return Urql.useMutation<CreateEventMutation, CreateEventMutationVariables>(CreateEventDocument);
};
export const CreateServiceProviderReviewDocument = gql`
    mutation createServiceProviderReview($input: CreateServiceProviderReviewInput!) {
  createServiceProviderReview(input: $input) {
    ...ServiceProviderReview
  }
}
    ${ServiceProviderReviewFragmentDoc}`;

export function useCreateServiceProviderReviewMutation() {
  return Urql.useMutation<CreateServiceProviderReviewMutation, CreateServiceProviderReviewMutationVariables>(CreateServiceProviderReviewDocument);
};
export const CreateUserExportDocument = gql`
    mutation createUserExport {
  createUserExport
}
    `;

export function useCreateUserExportMutation() {
  return Urql.useMutation<CreateUserExportMutation, CreateUserExportMutationVariables>(CreateUserExportDocument);
};
export const CreateUserInviteDocument = gql`
    mutation createUserInvite($input: CreateUserInviteInput!) {
  createUserInvite(input: $input) {
    email
    userRole
  }
}
    `;

export function useCreateUserInviteMutation() {
  return Urql.useMutation<CreateUserInviteMutation, CreateUserInviteMutationVariables>(CreateUserInviteDocument);
};
export const DeleteActionCommentDocument = gql`
    mutation deleteActionComment($input: DeleteActionCommentInput!) {
  deleteActionComment(input: $input)
}
    `;

export function useDeleteActionCommentMutation() {
  return Urql.useMutation<DeleteActionCommentMutation, DeleteActionCommentMutationVariables>(DeleteActionCommentDocument);
};
export const DeleteCompanyDocument = gql`
    mutation deleteCompany($input: DeleteCompanyInput!) {
  deleteCompany(input: $input) {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useDeleteCompanyMutation() {
  return Urql.useMutation<DeleteCompanyMutation, DeleteCompanyMutationVariables>(DeleteCompanyDocument);
};
export const DeleteServiceProviderReviewDocument = gql`
    mutation deleteServiceProviderReview($input: DeleteServiceProviderReviewInput!) {
  deleteServiceProviderReview(input: $input) {
    ...ServiceProviderReview
  }
}
    ${ServiceProviderReviewFragmentDoc}`;

export function useDeleteServiceProviderReviewMutation() {
  return Urql.useMutation<DeleteServiceProviderReviewMutation, DeleteServiceProviderReviewMutationVariables>(DeleteServiceProviderReviewDocument);
};
export const DeleteUserDocument = gql`
    mutation deleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const PlanCompanyActionDocument = gql`
    mutation planCompanyAction($input: PlanCompanyActionInput!) {
  planCompanyAction(input: $input) {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function usePlanCompanyActionMutation() {
  return Urql.useMutation<PlanCompanyActionMutation, PlanCompanyActionMutationVariables>(PlanCompanyActionDocument);
};
export const ProcessEventInviteTokenDocument = gql`
    mutation processEventInviteToken($input: ProcessEventInviteTokenInput!) {
  processEventInviteToken(input: $input) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

export function useProcessEventInviteTokenMutation() {
  return Urql.useMutation<ProcessEventInviteTokenMutation, ProcessEventInviteTokenMutationVariables>(ProcessEventInviteTokenDocument);
};
export const ProcessEventRsvpTokenDocument = gql`
    mutation processEventRSVPToken($input: ProcessEventRSVPTokenInput!) {
  processEventRSVPToken(input: $input) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

export function useProcessEventRsvpTokenMutation() {
  return Urql.useMutation<ProcessEventRsvpTokenMutation, ProcessEventRsvpTokenMutationVariables>(ProcessEventRsvpTokenDocument);
};
export const PurgeCacheDocument = gql`
    mutation purgeCache {
  purgeCache
}
    `;

export function usePurgeCacheMutation() {
  return Urql.useMutation<PurgeCacheMutation, PurgeCacheMutationVariables>(PurgeCacheDocument);
};
export const RegisterUserDocument = gql`
    mutation registerUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useRegisterUserMutation() {
  return Urql.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument);
};
export const RemoveEventParticipantDocument = gql`
    mutation removeEventParticipant($input: RemoveEventParticipantInput!) {
  removeEventParticipant(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useRemoveEventParticipantMutation() {
  return Urql.useMutation<RemoveEventParticipantMutation, RemoveEventParticipantMutationVariables>(RemoveEventParticipantDocument);
};
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($input: RequestPasswordResetInput!) {
  requestPasswordReset(input: $input)
}
    `;

export function useRequestPasswordResetMutation() {
  return Urql.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument);
};
export const ResendEmailVerificationDocument = gql`
    mutation resendEmailVerification($input: ResendEmailVerificationInput!) {
  resendEmailVerification(input: $input)
}
    `;

export function useResendEmailVerificationMutation() {
  return Urql.useMutation<ResendEmailVerificationMutation, ResendEmailVerificationMutationVariables>(ResendEmailVerificationDocument);
};
export const TriggerDeploymentDocument = gql`
    mutation triggerDeployment($input: TriggerDeploymentInput!) {
  triggerDeployment(input: $input)
}
    `;

export function useTriggerDeploymentMutation() {
  return Urql.useMutation<TriggerDeploymentMutation, TriggerDeploymentMutationVariables>(TriggerDeploymentDocument);
};
export const UpdateActionCommentDocument = gql`
    mutation updateActionComment($input: UpdateActionCommentInput!) {
  updateActionComment(input: $input) {
    ...ActionComment
  }
}
    ${ActionCommentFragmentDoc}`;

export function useUpdateActionCommentMutation() {
  return Urql.useMutation<UpdateActionCommentMutation, UpdateActionCommentMutationVariables>(UpdateActionCommentDocument);
};
export const UpdateCompanyDocument = gql`
    mutation updateCompany($input: UpdateCompanyInput!) {
  updateCompany(input: $input) {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useUpdateCompanyMutation() {
  return Urql.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument);
};
export const UpdateEventParticipantStatusDocument = gql`
    mutation updateEventParticipantStatus($input: UpdateEventParticipantStatusInput!) {
  updateEventParticipantStatus(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useUpdateEventParticipantStatusMutation() {
  return Urql.useMutation<UpdateEventParticipantStatusMutation, UpdateEventParticipantStatusMutationVariables>(UpdateEventParticipantStatusDocument);
};
export const UpdateEventDocument = gql`
    mutation updateEvent($input: UpdateEventInput!) {
  updateEvent(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useUpdateEventMutation() {
  return Urql.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(UpdateEventDocument);
};
export const UpdateServiceProviderReviewDocument = gql`
    mutation updateServiceProviderReview($input: UpdateServiceProviderReviewInput!) {
  updateServiceProviderReview(input: $input) {
    ...ServiceProviderReview
  }
}
    ${ServiceProviderReviewFragmentDoc}`;

export function useUpdateServiceProviderReviewMutation() {
  return Urql.useMutation<UpdateServiceProviderReviewMutation, UpdateServiceProviderReviewMutationVariables>(UpdateServiceProviderReviewDocument);
};
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};
export const ActionCommentAttachmentsDocument = gql`
    query actionCommentAttachments($input: ActionCommentAttachmentsInput!) {
  actionCommentAttachments(input: $input) {
    ...ActionCommentAttachment
  }
}
    ${ActionCommentAttachmentFragmentDoc}`;

export function useActionCommentAttachmentsQuery(options: Omit<Urql.UseQueryArgs<ActionCommentAttachmentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ActionCommentAttachmentsQuery, ActionCommentAttachmentsQueryVariables>({ query: ActionCommentAttachmentsDocument, ...options });
};
export const ActionCommentsDocument = gql`
    query actionComments($input: ActionCommentsInput!) {
  actionComments(input: $input) {
    ...ActionComment
  }
}
    ${ActionCommentFragmentDoc}`;

export function useActionCommentsQuery(options: Omit<Urql.UseQueryArgs<ActionCommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ActionCommentsQuery, ActionCommentsQueryVariables>({ query: ActionCommentsDocument, ...options });
};
export const CompaniesDocument = gql`
    query companies($input: CompaniesInput) {
  companies(input: $input) {
    cursor
    items {
      ...Company
    }
  }
}
    ${CompanyFragmentDoc}`;

export function useCompaniesQuery(options?: Omit<Urql.UseQueryArgs<CompaniesQueryVariables>, 'query'>) {
  return Urql.useQuery<CompaniesQuery, CompaniesQueryVariables>({ query: CompaniesDocument, ...options });
};
export const CompanyAchievementsMiniDocument = gql`
    query companyAchievementsMini {
  company {
    id
    program {
      contentId
      achievements {
        ...CompanyAchievementMini
      }
    }
  }
}
    ${CompanyAchievementMiniFragmentDoc}`;

export function useCompanyAchievementsMiniQuery(options?: Omit<Urql.UseQueryArgs<CompanyAchievementsMiniQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyAchievementsMiniQuery, CompanyAchievementsMiniQueryVariables>({ query: CompanyAchievementsMiniDocument, ...options });
};
export const CompanyAchievementsDocument = gql`
    query companyAchievements {
  company {
    id
    program {
      contentId
      achievements {
        ...CompanyAchievement
      }
    }
  }
}
    ${CompanyAchievementFragmentDoc}`;

export function useCompanyAchievementsQuery(options?: Omit<Urql.UseQueryArgs<CompanyAchievementsQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyAchievementsQuery, CompanyAchievementsQueryVariables>({ query: CompanyAchievementsDocument, ...options });
};
export const CompanyActionDetailsDocument = gql`
    query companyActionDetails($input: CompanyActionInput!) {
  companyAction(input: $input) {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function useCompanyActionDetailsQuery(options: Omit<Urql.UseQueryArgs<CompanyActionDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyActionDetailsQuery, CompanyActionDetailsQueryVariables>({ query: CompanyActionDetailsDocument, ...options });
};
export const CompanyActionExtendedDetailsDocument = gql`
    query companyActionExtendedDetails($input: CompanyActionInput!) {
  companyAction(input: $input) {
    ...CompanyActionDetails
  }
}
    ${CompanyActionDetailsFragmentDoc}`;

export function useCompanyActionExtendedDetailsQuery(options: Omit<Urql.UseQueryArgs<CompanyActionExtendedDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyActionExtendedDetailsQuery, CompanyActionExtendedDetailsQueryVariables>({ query: CompanyActionExtendedDetailsDocument, ...options });
};
export const CompanyActionsListDocument = gql`
    query companyActionsList($input: CompanyActionsInput) {
  companyActions(input: $input) {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function useCompanyActionsListQuery(options?: Omit<Urql.UseQueryArgs<CompanyActionsListQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyActionsListQuery, CompanyActionsListQueryVariables>({ query: CompanyActionsListDocument, ...options });
};
export const CompanyDocument = gql`
    query company($input: CompanyInput) {
  company(input: $input) {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useCompanyQuery(options?: Omit<Urql.UseQueryArgs<CompanyQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyQuery, CompanyQueryVariables>({ query: CompanyDocument, ...options });
};
export const EventParticipantsDocument = gql`
    query eventParticipants($input: EventParticipantsInput!) {
  eventParticipants(input: $input) {
    ...EventParticipant
  }
}
    ${EventParticipantFragmentDoc}`;

export function useEventParticipantsQuery(options: Omit<Urql.UseQueryArgs<EventParticipantsQueryVariables>, 'query'>) {
  return Urql.useQuery<EventParticipantsQuery, EventParticipantsQueryVariables>({ query: EventParticipantsDocument, ...options });
};
export const EventDocument = gql`
    query event($input: EventInput!) {
  event(input: $input) {
    ...Event
  }
}
    ${EventFragmentDoc}`;

export function useEventQuery(options: Omit<Urql.UseQueryArgs<EventQueryVariables>, 'query'>) {
  return Urql.useQuery<EventQuery, EventQueryVariables>({ query: EventDocument, ...options });
};
export const EventsDocument = gql`
    query events($input: EventsInput) {
  events(input: $input) {
    ...EventWithParticipants
  }
}
    ${EventWithParticipantsFragmentDoc}`;

export function useEventsQuery(options?: Omit<Urql.UseQueryArgs<EventsQueryVariables>, 'query'>) {
  return Urql.useQuery<EventsQuery, EventsQueryVariables>({ query: EventsDocument, ...options });
};
export const SearchCompanyDocument = gql`
    query searchCompany($input: SearchCompanyInput!) {
  searchCompany(input: $input) {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useSearchCompanyQuery(options: Omit<Urql.UseQueryArgs<SearchCompanyQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchCompanyQuery, SearchCompanyQueryVariables>({ query: SearchCompanyDocument, ...options });
};
export const SearchUserDocument = gql`
    query searchUser($input: SearchUserInput!) {
  searchUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useSearchUserQuery(options: Omit<Urql.UseQueryArgs<SearchUserQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchUserQuery, SearchUserQueryVariables>({ query: SearchUserDocument, ...options });
};
export const ServiceProviderListsDocument = gql`
    query serviceProviderLists {
  serviceProviderLists {
    ...ServiceProviderList
  }
}
    ${ServiceProviderListFragmentDoc}`;

export function useServiceProviderListsQuery(options?: Omit<Urql.UseQueryArgs<ServiceProviderListsQueryVariables>, 'query'>) {
  return Urql.useQuery<ServiceProviderListsQuery, ServiceProviderListsQueryVariables>({ query: ServiceProviderListsDocument, ...options });
};
export const ServiceProviderReviewsDocument = gql`
    query serviceProviderReviews($input: ServiceProviderReviewsInput!) {
  serviceProviderReviews(input: $input) {
    cursor
    items {
      ...ServiceProviderReview
    }
  }
}
    ${ServiceProviderReviewFragmentDoc}`;

export function useServiceProviderReviewsQuery(options: Omit<Urql.UseQueryArgs<ServiceProviderReviewsQueryVariables>, 'query'>) {
  return Urql.useQuery<ServiceProviderReviewsQuery, ServiceProviderReviewsQueryVariables>({ query: ServiceProviderReviewsDocument, ...options });
};
export const ServiceProvidersDocument = gql`
    query serviceProviders($input: ServiceProvidersInput) {
  serviceProviders(input: $input) {
    ...ServiceProvider
  }
}
    ${ServiceProviderFragmentDoc}`;

export function useServiceProvidersQuery(options?: Omit<Urql.UseQueryArgs<ServiceProvidersQueryVariables>, 'query'>) {
  return Urql.useQuery<ServiceProvidersQuery, ServiceProvidersQueryVariables>({ query: ServiceProvidersDocument, ...options });
};
export const UserActionsListDocument = gql`
    query userActionsList($input: UserActionsInput) {
  userActions(input: $input) {
    ...UserAction
  }
}
    ${UserActionFragmentDoc}`;

export function useUserActionsListQuery(options?: Omit<Urql.UseQueryArgs<UserActionsListQueryVariables>, 'query'>) {
  return Urql.useQuery<UserActionsListQuery, UserActionsListQueryVariables>({ query: UserActionsListDocument, ...options });
};
export const UserInvitesDocument = gql`
    query userInvites($input: UserInvitesInput) {
  userInvites(input: $input) {
    ...UserInvite
  }
}
    ${UserInviteFragmentDoc}`;

export function useUserInvitesQuery(options?: Omit<Urql.UseQueryArgs<UserInvitesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserInvitesQuery, UserInvitesQueryVariables>({ query: UserInvitesDocument, ...options });
};
export const UserDocument = gql`
    query user($input: UserInput) {
  user(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery, UserQueryVariables>({ query: UserDocument, ...options });
};
export const UsersDocument = gql`
    query users($input: UsersInput) {
  users(input: $input) {
    cursor
    items {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};