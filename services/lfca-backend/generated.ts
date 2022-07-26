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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AchievementFunnelStats = {
  __typename?: 'AchievementFunnelStats';
  companiesAchievementReachedCount: Scalars['Int'];
  companiesCompletedFirstActionCount: Scalars['Int'];
  companiesCreatedCount: Scalars['Int'];
};

export type AchievementFunnelStatsInput = {
  achievementContentIds?: InputMaybe<Array<Scalars['String']>>;
  companiesCreatedFrom: Scalars['DateTime'];
  companiesCreatedUntil: Scalars['DateTime'];
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
  id: Scalars['ID'];
  logoUrl?: Maybe<Scalars['String']>;
  micrositeSlug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
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
  companiesPlannedCount: Scalars['Int'];
  companyId?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  customSections: Array<CustomSectionContent>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  heroImage?: Maybe<ContentAsset>;
  /** A unique identifier generated using the contentId and companyId as long as the action has not expired */
  id: Scalars['ID'];
  impactValue: Scalars['Float'];
  notes?: Maybe<Scalars['String']>;
  plannedAt?: Maybe<Scalars['DateTime']>;
  recentCompaniesCompleted: Array<Company>;
  recommendedForCompanyAchievementIds: Array<Scalars['ID']>;
  requiredForCompanyAchievementIds: Array<Scalars['ID']>;
  requirements: Array<CompanyActionRequirement>;
  title?: Maybe<Scalars['String']>;
};


export type CompanyActionRecentCompaniesCompletedArgs = {
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
  companyId: Scalars['ID'];
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
  PREMIUM = 'PREMIUM'
}

export type CompanyTag = {
  __typename?: 'CompanyTag';
  id: Scalars['ID'];
  name: Scalars['String'];
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
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  programContentId: Scalars['String'];
  subscriptionType: CompanySubscriptionType;
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
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

export type CreateUserInput = {
  companyId: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  sortWeight?: InputMaybe<Scalars['Int']>;
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

export type CustomSectionContent = {
  __typename?: 'CustomSectionContent';
  componentId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type DeleteActionCommentInput = {
  id: Scalars['ID'];
};

export type DeleteCompanyInput = {
  companyId: Scalars['ID'];
};

export type DeleteUserInput = {
  userId: Scalars['ID'];
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

export type Mutation = {
  __typename?: 'Mutation';
  completeCompanyAction: CompanyAction;
  completeCompanyActionRequirement: CompanyActionRequirement;
  completeUserAction: UserAction;
  createActionComment: ActionComment;
  createCompany: Company;
  createCompanyExport: Scalars['String'];
  createServiceProviderReview: ServiceProviderReview;
  /**
   * Allows admins to create new users
   * @deprecated use createUserInvite mutation instead
   */
  createUser: User;
  createUserExport: Scalars['String'];
  createUserInvite: UserInvite;
  deleteActionComment: Scalars['Boolean'];
  deleteCompany: Company;
  deleteUser: User;
  planCompanyAction: CompanyAction;
  processCompanyActionDeprecation: Scalars['Boolean'];
  processCompanyActionExpiry: Scalars['Boolean'];
  processUserActionExpiry: Scalars['Boolean'];
  /** Allows users to register if they have been invited */
  registerUser: User;
  requestPasswordReset: Scalars['Boolean'];
  updateActionComment: ActionComment;
  updateCompany: Company;
  updateServiceProviderReview?: Maybe<ServiceProviderReview>;
  updateUser: User;
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


export type MutationCreateServiceProviderReviewArgs = {
  input: CreateServiceProviderReviewInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
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


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationPlanCompanyActionArgs = {
  input: PlanCompanyActionInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationUpdateActionCommentArgs = {
  input: UpdateActionCommentInput;
};


export type MutationUpdateCompanyArgs = {
  input: UpdateCompanyInput;
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
  counterStats: CounterStatsResult;
  qualifiedCompanies: Array<Company>;
  searchCompany: Array<Company>;
  searchUser: Array<User>;
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

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
};

export type RequestPasswordResetInput = {
  email: Scalars['String'];
};

export type SearchCompanyInput = {
  query: Scalars['String'];
};

export type SearchUserInput = {
  query: Scalars['String'];
};

export type ServiceProvider = {
  __typename?: 'ServiceProvider';
  averageRating?: Maybe<Scalars['Float']>;
  certifications: Array<Tag>;
  description?: Maybe<Scalars['JSON']>;
  email?: Maybe<Scalars['String']>;
  freeDemo: Scalars['Boolean'];
  highestPrice?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  isPrivate: Scalars['Boolean'];
  languages: Array<Tag>;
  logo?: Maybe<ContentAsset>;
  lowestPrice?: Maybe<Scalars['Int']>;
  memberId?: Maybe<Scalars['String']>;
  model: Array<Tag>;
  name: Scalars['String'];
  reviewsCount: Scalars['Int'];
  services: Array<Tag>;
  size?: Maybe<Scalars['String']>;
  supplyChainComplexity: Array<Tag>;
  website?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

export type ServiceProviderReview = {
  __typename?: 'ServiceProviderReview';
  /** ServiceProviderReview's can be anonymous so we might not always get a user */
  author?: Maybe<User>;
  cons: Array<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
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
  help?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sortWeight?: Maybe<Scalars['Int']>;
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
  logoUrl?: InputMaybe<Scalars['String']>;
  micrositeSlug?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  programContentId?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<CompanySubscriptionType>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  websiteUrl?: InputMaybe<Scalars['String']>;
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
  companyId?: Maybe<Scalars['String']>;
  completedActions: Array<UserAction>;
  country: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
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

export type ActionCommentFragment = { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null };

export type CategoryFragment = { __typename?: 'Category', id: string, name?: string | null };

export type CompanyAchievementMiniFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }> };

export type CompanyAchievementFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, micrositeUrl?: string | null, minCompletedCompanyActionsCount?: number | null, name: string, editableCompanyProperties: Array<string>, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }> };

export type CompanyActionListItemFragment = { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }> };

export type CompanyActionRequirementFragment = { __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string };

export type CompanyFragment = { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> };

export type ServiceProviderReviewFragment = { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null };

export type ServiceProviderFragment = { __typename?: 'ServiceProvider', averageRating?: number | null, highestPrice?: number | null, lowestPrice?: number | null, reviewsCount: number, description?: any | null, id: string, memberId?: string | null, name: string, size?: string | null, year?: number | null, email?: string | null, website?: string | null, isPrivate: boolean, freeDemo: boolean, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, model: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, services: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, supplyChainComplexity: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, languages: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, certifications: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }> };

export type TagFragment = { __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null };

export type UserActionFragment = { __typename?: 'UserAction', id: string, notes?: string | null, contentId: string, completedAt?: any | null, createdAt: any, values?: any | null };

export type UserAvatarFragment = { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null };

export type UserInviteFragment = { __typename?: 'UserInvite', email: string, userRole: string, id: string, user?: { __typename?: 'User', id: string, companyId?: string | null, email: string } | null };

export type UserFragment = { __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null };

export type CompleteCompanyActionRequirementMutationVariables = Exact<{
  input: CompleteCompanyActionRequirementInput;
}>;


export type CompleteCompanyActionRequirementMutation = { __typename?: 'Mutation', completeCompanyActionRequirement: { __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string } };

export type CompleteCompanyActionMutationVariables = Exact<{
  input: CompleteCompanyActionInput;
}>;


export type CompleteCompanyActionMutation = { __typename?: 'Mutation', completeCompanyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }> } };

export type CompleteUserActionMutationVariables = Exact<{
  input: CompleteUserActionInput;
}>;


export type CompleteUserActionMutation = { __typename?: 'Mutation', completeUserAction: { __typename?: 'UserAction', id: string, notes?: string | null, contentId: string, completedAt?: any | null, createdAt: any, values?: any | null } };

export type CreateActionCommentMutationVariables = Exact<{
  input: CreateActionCommentInput;
}>;


export type CreateActionCommentMutation = { __typename?: 'Mutation', createActionComment: { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null } };

export type CreateCompanyExportMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCompanyExportMutation = { __typename?: 'Mutation', createCompanyExport: string };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> } };

export type CreateServiceProviderReviewMutationVariables = Exact<{
  input: CreateServiceProviderReviewInput;
}>;


export type CreateServiceProviderReviewMutation = { __typename?: 'Mutation', createServiceProviderReview: { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null } };

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


export type DeleteCompanyMutation = { __typename?: 'Mutation', deleteCompany: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> } };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null } };

export type PlanCompanyActionMutationVariables = Exact<{
  input: PlanCompanyActionInput;
}>;


export type PlanCompanyActionMutation = { __typename?: 'Mutation', planCompanyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }> } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null } };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type UpdateActionCommentMutationVariables = Exact<{
  input: UpdateActionCommentInput;
}>;


export type UpdateActionCommentMutation = { __typename?: 'Mutation', updateActionComment: { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> } };

export type UpdateServiceProviderReviewMutationVariables = Exact<{
  input: UpdateServiceProviderReviewInput;
}>;


export type UpdateServiceProviderReviewMutation = { __typename?: 'Mutation', updateServiceProviderReview?: { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null } };

export type ActionCommentAttachmentsQueryVariables = Exact<{
  input: ActionCommentAttachmentsInput;
}>;


export type ActionCommentAttachmentsQuery = { __typename?: 'Query', actionCommentAttachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }> };

export type ActionCommentsQueryVariables = Exact<{
  input: ActionCommentsInput;
}>;


export type ActionCommentsQuery = { __typename?: 'Query', actionComments: Array<{ __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null }> };

export type CompaniesQueryVariables = Exact<{
  input?: InputMaybe<CompaniesInput>;
}>;


export type CompaniesQuery = { __typename?: 'Query', companies: { __typename?: 'CompaniesResult', cursor?: string | null, items: Array<{ __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> }> } };

export type CompanyAchievementsMiniQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAchievementsMiniQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }> }> } } };

export type CompanyAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAchievementsQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, micrositeUrl?: string | null, minCompletedCompanyActionsCount?: number | null, name: string, editableCompanyProperties: Array<string>, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }> }> } } };

export type CompanyActionDetailsQueryVariables = Exact<{
  input: CompanyActionInput;
}>;


export type CompanyActionDetailsQuery = { __typename?: 'Query', companyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }> } };

export type CompanyActionsListQueryVariables = Exact<{
  input?: InputMaybe<CompanyActionsInput>;
}>;


export type CompanyActionsListQuery = { __typename?: 'Query', companyActions: Array<{ __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', contentId: string, title?: string | null, completedAt?: any | null, description?: string | null, id: string }>, categories: Array<{ __typename?: 'Category', id: string, name?: string | null }> }> };

export type CompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> } };

export type SearchCompanyQueryVariables = Exact<{
  input: SearchCompanyInput;
}>;


export type SearchCompanyQuery = { __typename?: 'Query', searchCompany: Array<{ __typename?: 'Company', campaignContribution?: string | null, campaignGoals?: string | null, country: string, crmId?: string | null, deletedAt?: any | null, employeeCount: number, id: string, logoUrl?: string | null, micrositeSlug?: string | null, name?: string | null, subscriptionType: CompanySubscriptionType, websiteUrl?: string | null, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }>, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, tags: Array<{ __typename?: 'CompanyTag', id: string, name: string }> }> };

export type SearchUserQueryVariables = Exact<{
  input: SearchUserInput;
}>;


export type SearchUserQuery = { __typename?: 'Query', searchUser: Array<{ __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null }> };

export type ServiceProviderReviewsQueryVariables = Exact<{
  input: ServiceProviderReviewsInput;
}>;


export type ServiceProviderReviewsQuery = { __typename?: 'Query', serviceProviderReviews: { __typename?: 'ServiceProviderReviewsResult', cursor?: string | null, items: Array<{ __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, serviceProviderContentId: string, author?: { __typename?: 'User', email: string, firstName: string, id: string, picture?: string | null } | null }> } };

export type ServiceProvidersQueryVariables = Exact<{
  input?: InputMaybe<ServiceProvidersInput>;
}>;


export type ServiceProvidersQuery = { __typename?: 'Query', serviceProviders: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, highestPrice?: number | null, lowestPrice?: number | null, reviewsCount: number, description?: any | null, id: string, memberId?: string | null, name: string, size?: string | null, year?: number | null, email?: string | null, website?: string | null, isPrivate: boolean, freeDemo: boolean, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, model: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, services: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, supplyChainComplexity: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, languages: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }>, certifications: Array<{ __typename?: 'Tag', id: string, name?: string | null, sortWeight?: number | null, help?: string | null }> }> };

export type UserActionsListQueryVariables = Exact<{
  input?: InputMaybe<UserActionsInput>;
}>;


export type UserActionsListQuery = { __typename?: 'Query', userActions: Array<{ __typename?: 'UserAction', id: string, notes?: string | null, contentId: string, completedAt?: any | null, createdAt: any, values?: any | null }> };

export type UserInvitesQueryVariables = Exact<{
  input?: InputMaybe<UserInvitesInput>;
}>;


export type UserInvitesQuery = { __typename?: 'Query', userInvites: Array<{ __typename?: 'UserInvite', email: string, userRole: string, id: string, user?: { __typename?: 'User', id: string, companyId?: string | null, email: string } | null }> };

export type UserQueryVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null } };

export type UsersQueryVariables = Exact<{
  input?: InputMaybe<UsersInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResult', cursor?: string | null, items: Array<{ __typename?: 'User', companyId?: string | null, country: string, deletedAt?: any | null, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight: number, company?: { __typename?: 'Company', name?: string | null, logoUrl?: string | null, programContentId: string, subscriptionType: CompanySubscriptionType } | null }> } };

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
export const CompanyActionRequirementFragmentDoc = gql`
    fragment CompanyActionRequirement on CompanyActionRequirement {
  contentId
  title
  completedAt
  description
  id
}
    `;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  id
  name
}
    `;
export const CompanyActionListItemFragmentDoc = gql`
    fragment CompanyActionListItem on CompanyAction {
  commentAttachmentCount
  commentCount
  companiesCompletedCount
  companiesPlannedCount
  completedAt
  contentId
  customSections {
    id
    componentId
  }
  heroImage {
    id
    url
  }
  id
  impactValue
  plannedAt
  recentCompaniesCompleted(limit: 3) {
    id
    logoUrl
    name
  }
  recommendedForCompanyAchievementIds
  requiredForCompanyAchievementIds
  requirements {
    ...CompanyActionRequirement
  }
  categories {
    ...Category
  }
  title
  notes
}
    ${CompanyActionRequirementFragmentDoc}
${CategoryFragmentDoc}`;
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
  employeeCount
  id
  logoUrl
  micrositeSlug
  name
  program {
    contentId
    name
  }
  subscriptionType
  tags {
    id
    name
  }
  websiteUrl
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
  pros
  rating
  review
  serviceProviderContentId
}
    ${UserAvatarFragmentDoc}`;
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
  id
  name
  sortWeight
  help
}
    `;
export const ServiceProviderFragmentDoc = gql`
    fragment ServiceProvider on ServiceProvider {
  averageRating
  highestPrice
  lowestPrice
  reviewsCount
  description
  id
  logo {
    id
    url
  }
  memberId
  model {
    ...Tag
  }
  name
  services {
    ...Tag
  }
  size
  supplyChainComplexity {
    ...Tag
  }
  year
  email
  website
  isPrivate
  freeDemo
  languages {
    ...Tag
  }
  certifications {
    ...Tag
  }
}
    ${TagFragmentDoc}`;
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
    companyId
    email
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  companyId
  country
  deletedAt
  email
  firstName
  id
  lastName
  phone
  picture
  roles
  sortWeight
  company {
    name
    logoUrl
    programContentId
    subscriptionType
  }
}
    `;
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
export const RequestPasswordResetDocument = gql`
    mutation requestPasswordReset($input: RequestPasswordResetInput!) {
  requestPasswordReset(input: $input)
}
    `;

export function useRequestPasswordResetMutation() {
  return Urql.useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument);
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
  return Urql.useQuery<ActionCommentAttachmentsQuery>({ query: ActionCommentAttachmentsDocument, ...options });
};
export const ActionCommentsDocument = gql`
    query actionComments($input: ActionCommentsInput!) {
  actionComments(input: $input) {
    ...ActionComment
  }
}
    ${ActionCommentFragmentDoc}`;

export function useActionCommentsQuery(options: Omit<Urql.UseQueryArgs<ActionCommentsQueryVariables>, 'query'>) {
  return Urql.useQuery<ActionCommentsQuery>({ query: ActionCommentsDocument, ...options });
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
  return Urql.useQuery<CompaniesQuery>({ query: CompaniesDocument, ...options });
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
  return Urql.useQuery<CompanyAchievementsMiniQuery>({ query: CompanyAchievementsMiniDocument, ...options });
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
  return Urql.useQuery<CompanyAchievementsQuery>({ query: CompanyAchievementsDocument, ...options });
};
export const CompanyActionDetailsDocument = gql`
    query companyActionDetails($input: CompanyActionInput!) {
  companyAction(input: $input) {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function useCompanyActionDetailsQuery(options: Omit<Urql.UseQueryArgs<CompanyActionDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyActionDetailsQuery>({ query: CompanyActionDetailsDocument, ...options });
};
export const CompanyActionsListDocument = gql`
    query companyActionsList($input: CompanyActionsInput) {
  companyActions(input: $input) {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function useCompanyActionsListQuery(options?: Omit<Urql.UseQueryArgs<CompanyActionsListQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyActionsListQuery>({ query: CompanyActionsListDocument, ...options });
};
export const CompanyDocument = gql`
    query company {
  company {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useCompanyQuery(options?: Omit<Urql.UseQueryArgs<CompanyQueryVariables>, 'query'>) {
  return Urql.useQuery<CompanyQuery>({ query: CompanyDocument, ...options });
};
export const SearchCompanyDocument = gql`
    query searchCompany($input: SearchCompanyInput!) {
  searchCompany(input: $input) {
    ...Company
  }
}
    ${CompanyFragmentDoc}`;

export function useSearchCompanyQuery(options: Omit<Urql.UseQueryArgs<SearchCompanyQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchCompanyQuery>({ query: SearchCompanyDocument, ...options });
};
export const SearchUserDocument = gql`
    query searchUser($input: SearchUserInput!) {
  searchUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useSearchUserQuery(options: Omit<Urql.UseQueryArgs<SearchUserQueryVariables>, 'query'>) {
  return Urql.useQuery<SearchUserQuery>({ query: SearchUserDocument, ...options });
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
  return Urql.useQuery<ServiceProviderReviewsQuery>({ query: ServiceProviderReviewsDocument, ...options });
};
export const ServiceProvidersDocument = gql`
    query serviceProviders($input: ServiceProvidersInput) {
  serviceProviders(input: $input) {
    ...ServiceProvider
  }
}
    ${ServiceProviderFragmentDoc}`;

export function useServiceProvidersQuery(options?: Omit<Urql.UseQueryArgs<ServiceProvidersQueryVariables>, 'query'>) {
  return Urql.useQuery<ServiceProvidersQuery>({ query: ServiceProvidersDocument, ...options });
};
export const UserActionsListDocument = gql`
    query userActionsList($input: UserActionsInput) {
  userActions(input: $input) {
    ...UserAction
  }
}
    ${UserActionFragmentDoc}`;

export function useUserActionsListQuery(options?: Omit<Urql.UseQueryArgs<UserActionsListQueryVariables>, 'query'>) {
  return Urql.useQuery<UserActionsListQuery>({ query: UserActionsListDocument, ...options });
};
export const UserInvitesDocument = gql`
    query userInvites($input: UserInvitesInput) {
  userInvites(input: $input) {
    ...UserInvite
  }
}
    ${UserInviteFragmentDoc}`;

export function useUserInvitesQuery(options?: Omit<Urql.UseQueryArgs<UserInvitesQueryVariables>, 'query'>) {
  return Urql.useQuery<UserInvitesQuery>({ query: UserInvitesDocument, ...options });
};
export const UserDocument = gql`
    query user($input: UserInput) {
  user(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
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
  return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
};