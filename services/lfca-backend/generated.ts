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
  ActionRequirementDBValue: any;
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
  author: User;
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

export type ActionRequirementValue = {
  __typename?: 'ActionRequirementValue';
  contentId: Scalars['String'];
  hint?: Maybe<Scalars['String']>;
  /** A unique identifier generated using the CompanyActionRequirement.id and contentId */
  id: Scalars['ID'];
  inputOptions?: Maybe<Array<Maybe<InputOption>>>;
  placeholder?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type: ValueContentType;
  unit?: Maybe<Scalars['String']>;
  /** The value stored in the DB */
  value?: Maybe<Scalars['ActionRequirementDBValue']>;
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

export type ComaniesTakingActionResultItem = {
  __typename?: 'ComaniesTakingActionResultItem';
  actionContentId: Scalars['String'];
  companiesCompleted: Array<Company>;
  companiesPlanned: Array<Company>;
  total: Scalars['Int'];
};

export type CompaniesTakingActionInput = {
  filter?: InputMaybe<CompaniesTakingActionInputFilter>;
  limitCompaniesPerAction?: InputMaybe<Scalars['Int']>;
};

export type CompaniesTakingActionInputFilter = {
  actionContentIds?: InputMaybe<Array<Scalars['String']>>;
};

export type Company = {
  __typename?: 'Company';
  aboutSections?: Maybe<Array<Maybe<CompanyAboutSection>>>;
  campaignContribution?: Maybe<Scalars['String']>;
  campaignFiles: Array<File>;
  campaignGoalSetting?: Maybe<Scalars['String']>;
  campaignGoals?: Maybe<Scalars['String']>;
  campaignParticipationPackages?: Maybe<Scalars['JSON']>;
  completedCompanyActions: Array<CompanyAction>;
  employeeCount: Scalars['Int'];
  id: Scalars['ID'];
  logoUrl?: Maybe<Scalars['String']>;
  micrositeSlug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  program: CompanyProgram;
  websiteUrl?: Maybe<Scalars['String']>;
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
  tags: Array<Tag>;
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
  values?: Maybe<Array<Maybe<ActionRequirementValue>>>;
};

export type CompanyActionsInput = {
  filter?: InputMaybe<CompanyActionsInputFilter>;
};

export type CompanyActionsInputFilter = {
  actionContentIds: Array<Scalars['String']>;
};

export type CompanyImpactInput = {
  filter?: InputMaybe<CompanyImpactInputFilter>;
};

export type CompanyImpactInputFilter = {
  excludeActionContentIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CompanyImpactResult = {
  __typename?: 'CompanyImpactResult';
  amountOfCompletedRequirements: Scalars['Int'];
  impact: Scalars['Float'];
};

export type CompanyProgram = {
  __typename?: 'CompanyProgram';
  achievements: Array<CompanyAchievement>;
  availableMeasurementOptions: Array<Scalars['String']>;
  contentId: Scalars['ID'];
  name: Scalars['String'];
};

export type CompleteCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  notes?: InputMaybe<Scalars['String']>;
  skipRequirementsCheck?: InputMaybe<Scalars['Boolean']>;
};

export type CompleteCompanyActionRequirementInput = {
  actionContentId: Scalars['String'];
  actionRequirementContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  skipValueCheck?: InputMaybe<Scalars['Boolean']>;
  /** Some requirements have mandatory values to be provided on completion */
  values?: InputMaybe<Scalars['JSON']>;
};

export type ContentAsset = {
  __typename?: 'ContentAsset';
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
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
  companyId?: InputMaybe<Scalars['String']>;
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

export type InputOption = {
  __typename?: 'InputOption';
  label?: Maybe<Scalars['String']>;
  type: InputOptionType;
  valueString?: Maybe<Scalars['String']>;
};

export enum InputOptionType {
  STRING = 'STRING'
}

export type Mutation = {
  __typename?: 'Mutation';
  completeCompanyAction: CompanyAction;
  completeCompanyActionRequirement: CompanyActionRequirement;
  createActionComment: ActionComment;
  createServiceProviderReview: ServiceProviderReview;
  /** Allows admins to create new users */
  createUser: User;
  createUserInvite: UserInvite;
  deleteActionComment: Scalars['Boolean'];
  deleteUser: User;
  planCompanyAction: CompanyAction;
  processCompanyActionExpiry: Scalars['Boolean'];
  processUserActionExpiry: Scalars['Boolean'];
  /** Allows users to register if they have been invited */
  registerUser: User;
  requestPasswordReset: Scalars['Boolean'];
  updateActionComment: ActionComment;
  updateCompany: Company;
  updateUser: User;
};


export type MutationCompleteCompanyActionArgs = {
  input: CompleteCompanyActionInput;
};


export type MutationCompleteCompanyActionRequirementArgs = {
  input: CompleteCompanyActionRequirementInput;
};


export type MutationCreateActionCommentArgs = {
  input: CreateActionCommentInput;
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


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PlanCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
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
  companiesTakingAction: Array<ComaniesTakingActionResultItem>;
  company: Company;
  companyAction: CompanyAction;
  companyActions: Array<CompanyAction>;
  /** @deprecated not used anymore */
  companyImpact: CompanyImpactResult;
  completedCompanyActions: Array<CompanyAction>;
  expiredCompanyActions: Array<CompanyAction>;
  plannedCompanyActions: Array<CompanyAction>;
  qualifiedCompanies: Array<Company>;
  searchUser: Array<User>;
  serviceProviderReviews: Array<ServiceProviderReview>;
  serviceProviders: Array<ServiceProvider>;
  user: User;
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


export type QueryCompanyActionArgs = {
  input: CompanyActionInput;
};


export type QueryCompanyActionsArgs = {
  input?: InputMaybe<CompanyActionsInput>;
};


export type QueryCompanyImpactArgs = {
  input?: InputMaybe<CompanyImpactInput>;
};


export type QueryQualifiedCompaniesArgs = {
  input: QualifiedCompaniesInput;
};


export type QuerySearchUserArgs = {
  input: SearchUserInput;
};


export type QueryServiceProviderReviewsArgs = {
  input: ServiceProviderReviewsInput;
};


export type QueryServiceProvidersArgs = {
  input?: InputMaybe<ServiceProvidersInput>;
};


export type QueryUserArgs = {
  input?: InputMaybe<UserInput>;
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

export type SearchUserInput = {
  query: Scalars['String'];
};

export type ServiceProvider = {
  __typename?: 'ServiceProvider';
  averageRating?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['JSON']>;
  highestPrice?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  logo?: Maybe<ContentAsset>;
  lowestPrice?: Maybe<Scalars['Int']>;
  memberId?: Maybe<Scalars['String']>;
  model: Array<Tag>;
  name: Scalars['String'];
  reviewsCount: Scalars['Int'];
  services: Array<Tag>;
  size?: Maybe<Scalars['String']>;
  supplyChainComplexity: Array<Tag>;
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
};

export type ServiceProviderReviewsInput = {
  serviceProviderContentId: Scalars['String'];
};

export type ServiceProvidersInput = {
  filter?: InputMaybe<ServiceProvidersInputFilter>;
};

export type ServiceProvidersInputFilter = {
  serviceProviderContentIds: Array<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateActionCommentInput = {
  attachments?: InputMaybe<Array<CreateActionCommentAttachmentInput>>;
  id: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
};

export type UpdateCompanyInput = {
  aboutSections?: InputMaybe<Array<CompanyAboutSectionInput>>;
  campaignFiles?: InputMaybe<Array<FileInput>>;
  campaignGoalSetting?: InputMaybe<Scalars['String']>;
  campaignGoals?: InputMaybe<Scalars['String']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  websiteUrl?: InputMaybe<Scalars['String']>;
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
  companyId?: Maybe<Scalars['String']>;
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  picture?: Maybe<Scalars['String']>;
  roles: Array<Scalars['String']>;
  sortWeight?: Maybe<Scalars['Int']>;
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
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type UsersResult = {
  __typename?: 'UsersResult';
  cursor?: Maybe<Scalars['String']>;
  items: Array<User>;
};

export enum ValueContentType {
  BOOLEAN = 'BOOLEAN',
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  UPLOAD = 'UPLOAD'
}

export type ActionCommentAttachmentFragment = { __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string };

export type ActionCommentFragment = { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author: { __typename?: 'User', id: string, firstName: string, picture?: string | null } };

export type CompanyAchievementMiniFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }> };

export type CompanyAchievementFragment = { __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, micrositeUrl?: string | null, minCompletedCompanyActionsCount?: number | null, name: string, editableCompanyProperties: Array<string>, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }> };

export type CompanyActionListItemFragment = { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> };

export type CompanyFragment = { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, employeeCount: number, micrositeSlug?: string | null, campaignGoals?: string | null, campaignGoalSetting?: string | null, campaignContribution?: string | null, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }> };

export type ServiceProviderReviewFragment = { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, author?: { __typename?: 'User', id: string, firstName: string } | null };

export type ServiceProviderFragment = { __typename?: 'ServiceProvider', averageRating?: number | null, highestPrice?: number | null, lowestPrice?: number | null, reviewsCount: number, description?: any | null, id: string, memberId?: string | null, name: string, size?: string | null, year?: number | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, model: Array<{ __typename?: 'Tag', id: string, name?: string | null }>, services: Array<{ __typename?: 'Tag', id: string, name?: string | null }>, supplyChainComplexity: Array<{ __typename?: 'Tag', id: string, name?: string | null }> };

export type TagFragment = { __typename?: 'Tag', id: string, name?: string | null };

export type UserInviteFragment = { __typename?: 'UserInvite', email: string, userRole: string, id: string, user?: { __typename?: 'User', id: string, companyId?: string | null, email: string } | null };

export type UserFragment = { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null };

export type CompleteCompanyActionMutationVariables = Exact<{
  input: CompleteCompanyActionInput;
}>;


export type CompleteCompanyActionMutation = { __typename?: 'Mutation', completeCompanyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> } };

export type CreateActionCommentMutationVariables = Exact<{
  input: CreateActionCommentInput;
}>;


export type CreateActionCommentMutation = { __typename?: 'Mutation', createActionComment: { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author: { __typename?: 'User', id: string, firstName: string, picture?: string | null } } };

export type CreateServiceProviderReviewMutationVariables = Exact<{
  input: CreateServiceProviderReviewInput;
}>;


export type CreateServiceProviderReviewMutation = { __typename?: 'Mutation', createServiceProviderReview: { __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, author?: { __typename?: 'User', id: string, firstName: string } | null } };

export type CreateUserInviteMutationVariables = Exact<{
  input: CreateUserInviteInput;
}>;


export type CreateUserInviteMutation = { __typename?: 'Mutation', createUserInvite: { __typename?: 'UserInvite', email: string, userRole: string } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null } };

export type DeleteActionCommentMutationVariables = Exact<{
  input: DeleteActionCommentInput;
}>;


export type DeleteActionCommentMutation = { __typename?: 'Mutation', deleteActionComment: boolean };

export type PlanCompanyActionMutationVariables = Exact<{
  input: PlanCompanyActionInput;
}>;


export type PlanCompanyActionMutation = { __typename?: 'Mutation', planCompanyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null } };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type UpdateActionCommentMutationVariables = Exact<{
  input: UpdateActionCommentInput;
}>;


export type UpdateActionCommentMutation = { __typename?: 'Mutation', updateActionComment: { __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author: { __typename?: 'User', id: string, firstName: string, picture?: string | null } } };

export type UpdateCompanyMutationVariables = Exact<{
  input: UpdateCompanyInput;
}>;


export type UpdateCompanyMutation = { __typename?: 'Mutation', updateCompany: { __typename?: 'Company', id: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null } };

export type ActionCommentAttachmentsQueryVariables = Exact<{
  input: ActionCommentAttachmentsInput;
}>;


export type ActionCommentAttachmentsQuery = { __typename?: 'Query', actionCommentAttachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }> };

export type ActionCommentsQueryVariables = Exact<{
  input: ActionCommentsInput;
}>;


export type ActionCommentsQuery = { __typename?: 'Query', actionComments: Array<{ __typename?: 'ActionComment', id: string, message: string, createdAt: any, attachments: Array<{ __typename?: 'ActionCommentAttachment', fileName: string, fileSize: number, id: string, mimeType: string, source: string }>, author: { __typename?: 'User', id: string, firstName: string, picture?: string | null } }> };

export type CompanyAchievementsMiniQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAchievementsMiniQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, minCompletedCompanyActionsCount?: number | null, name: string, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null }> }> } } };

export type CompanyAchievementsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyAchievementsQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, program: { __typename?: 'CompanyProgram', contentId: string, achievements: Array<{ __typename?: 'CompanyAchievement', completedCompanyActionsCount: number, completedRequiredCompanyActionsCount: number, contentId: string, micrositeUrl?: string | null, minCompletedCompanyActionsCount?: number | null, name: string, editableCompanyProperties: Array<string>, recommendedActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }>, requiredActions: Array<{ __typename?: 'CompanyAction', id: string, title?: string | null, completedAt?: any | null, contentId: string }> }> } } };

export type CompanyActionDetailsQueryVariables = Exact<{
  input: CompanyActionInput;
}>;


export type CompanyActionDetailsQuery = { __typename?: 'Query', companyAction: { __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> } };

export type CompanyActionsListQueryVariables = Exact<{
  input?: InputMaybe<CompanyActionsInput>;
}>;


export type CompanyActionsListQuery = { __typename?: 'Query', companyActions: Array<{ __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> }> };

export type CompanyQueryVariables = Exact<{ [key: string]: never; }>;


export type CompanyQuery = { __typename?: 'Query', company: { __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null, employeeCount: number, micrositeSlug?: string | null, campaignGoals?: string | null, campaignGoalSetting?: string | null, campaignContribution?: string | null, program: { __typename?: 'CompanyProgram', contentId: string, name: string }, aboutSections?: Array<{ __typename?: 'CompanyAboutSection', heading?: string | null, imageUrl?: string | null, text?: string | null } | null> | null, campaignFiles: Array<{ __typename?: 'File', name?: string | null, url: string }> } };

export type CompletedCompanyActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CompletedCompanyActionsQuery = { __typename?: 'Query', completedCompanyActions: Array<{ __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> }> };

export type PlannedCompanyActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlannedCompanyActionsQuery = { __typename?: 'Query', plannedCompanyActions: Array<{ __typename?: 'CompanyAction', commentAttachmentCount: number, commentCount: number, companiesCompletedCount: number, companiesPlannedCount: number, completedAt?: any | null, contentId: string, id: string, impactValue: number, plannedAt?: any | null, recommendedForCompanyAchievementIds: Array<string>, requiredForCompanyAchievementIds: Array<string>, title?: string | null, notes?: string | null, customSections: Array<{ __typename?: 'CustomSectionContent', id: string, componentId?: string | null }>, heroImage?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, recentCompaniesCompleted: Array<{ __typename?: 'Company', id: string, logoUrl?: string | null, name?: string | null }>, requirements: Array<{ __typename?: 'CompanyActionRequirement', title?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name?: string | null }> }> };

export type ServiceProviderReviewsQueryVariables = Exact<{
  input: ServiceProviderReviewsInput;
}>;


export type ServiceProviderReviewsQuery = { __typename?: 'Query', serviceProviderReviews: Array<{ __typename?: 'ServiceProviderReview', cons: Array<string>, createdAt: any, id: string, pros: Array<string>, rating: number, review: string, author?: { __typename?: 'User', id: string, firstName: string } | null }> };

export type ServiceProvidersQueryVariables = Exact<{
  input?: InputMaybe<ServiceProvidersInput>;
}>;


export type ServiceProvidersQuery = { __typename?: 'Query', serviceProviders: Array<{ __typename?: 'ServiceProvider', averageRating?: number | null, highestPrice?: number | null, lowestPrice?: number | null, reviewsCount: number, description?: any | null, id: string, memberId?: string | null, name: string, size?: string | null, year?: number | null, logo?: { __typename?: 'ContentAsset', id: string, url?: string | null } | null, model: Array<{ __typename?: 'Tag', id: string, name?: string | null }>, services: Array<{ __typename?: 'Tag', id: string, name?: string | null }>, supplyChainComplexity: Array<{ __typename?: 'Tag', id: string, name?: string | null }> }> };

export type UserInvitesQueryVariables = Exact<{
  input?: InputMaybe<UserInvitesInput>;
}>;


export type UserInvitesQuery = { __typename?: 'Query', userInvites: Array<{ __typename?: 'UserInvite', email: string, userRole: string, id: string, user?: { __typename?: 'User', id: string, companyId?: string | null, email: string } | null }> };

export type UserQueryVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null } };

export type AllUsersQueryVariables = Exact<{
  input?: InputMaybe<UsersInput>;
}>;


export type AllUsersQuery = { __typename?: 'Query', users: { __typename?: 'UsersResult', cursor?: string | null, items: Array<{ __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null }> } };

export const ActionCommentAttachmentFragmentDoc = gql`
    fragment ActionCommentAttachment on ActionCommentAttachment {
  fileName
  fileSize
  id
  mimeType
  source
}
    `;
export const ActionCommentFragmentDoc = gql`
    fragment ActionComment on ActionComment {
  attachments {
    ...ActionCommentAttachment
  }
  author {
    id
    firstName
    picture
  }
  id
  message
  createdAt
}
    ${ActionCommentAttachmentFragmentDoc}`;
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
export const TagFragmentDoc = gql`
    fragment Tag on Tag {
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
    title
  }
  tags {
    ...Tag
  }
  title
  notes
}
    ${TagFragmentDoc}`;
export const CompanyFragmentDoc = gql`
    fragment Company on Company {
  id
  logoUrl
  name
  employeeCount
  micrositeSlug
  program {
    contentId
    name
  }
  aboutSections {
    heading
    imageUrl
    text
  }
  campaignGoals
  campaignGoalSetting
  campaignContribution
  campaignFiles {
    name
    url
  }
}
    `;
export const ServiceProviderReviewFragmentDoc = gql`
    fragment ServiceProviderReview on ServiceProviderReview {
  author {
    id
    firstName
  }
  cons
  createdAt
  id
  pros
  rating
  review
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
}
    ${TagFragmentDoc}`;
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
  email
  firstName
  id
  lastName
  phone
  picture
  roles
  sortWeight
}
    `;
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
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const DeleteActionCommentDocument = gql`
    mutation deleteActionComment($input: DeleteActionCommentInput!) {
  deleteActionComment(input: $input)
}
    `;

export function useDeleteActionCommentMutation() {
  return Urql.useMutation<DeleteActionCommentMutation, DeleteActionCommentMutationVariables>(DeleteActionCommentDocument);
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
    id
  }
}
    `;

export function useUpdateCompanyMutation() {
  return Urql.useMutation<UpdateCompanyMutation, UpdateCompanyMutationVariables>(UpdateCompanyDocument);
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
export const CompletedCompanyActionsDocument = gql`
    query completedCompanyActions {
  completedCompanyActions {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function useCompletedCompanyActionsQuery(options?: Omit<Urql.UseQueryArgs<CompletedCompanyActionsQueryVariables>, 'query'>) {
  return Urql.useQuery<CompletedCompanyActionsQuery>({ query: CompletedCompanyActionsDocument, ...options });
};
export const PlannedCompanyActionsDocument = gql`
    query plannedCompanyActions {
  plannedCompanyActions {
    ...CompanyActionListItem
  }
}
    ${CompanyActionListItemFragmentDoc}`;

export function usePlannedCompanyActionsQuery(options?: Omit<Urql.UseQueryArgs<PlannedCompanyActionsQueryVariables>, 'query'>) {
  return Urql.useQuery<PlannedCompanyActionsQuery>({ query: PlannedCompanyActionsDocument, ...options });
};
export const ServiceProviderReviewsDocument = gql`
    query serviceProviderReviews($input: ServiceProviderReviewsInput!) {
  serviceProviderReviews(input: $input) {
    ...ServiceProviderReview
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
export const AllUsersDocument = gql`
    query allUsers($input: UsersInput) {
  users(input: $input) {
    cursor
    items {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

export function useAllUsersQuery(options?: Omit<Urql.UseQueryArgs<AllUsersQueryVariables>, 'query'>) {
  return Urql.useQuery<AllUsersQuery>({ query: AllUsersDocument, ...options });
};