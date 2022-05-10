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

export type AchievementStatus = {
  __typename?: 'AchievementStatus';
  achievementName: Scalars['String'];
  completedMandatoryCompanyActionsCount: Scalars['Int'];
  mandatoryCompanyActionsCount: Scalars['Int'];
  micrositeBaseUrl?: Maybe<Scalars['String']>;
  minCompletedCompanyActionsCount: Scalars['Int'];
  recommendedActions: Array<CompanyAction>;
  requiredActions: Array<CompanyAction>;
};

export type ActionRequirementValue = {
  __typename?: 'ActionRequirementValue';
  contentId: Scalars['String'];
  hint?: Maybe<Scalars['String']>;
  /** A unique identifier generated using the companyActionContentId, companyActionRequirementContentId, contentId and companyId */
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
  aboutStrategy?: Maybe<Scalars['String']>;
  campaignContribution?: Maybe<Scalars['String']>;
  campaignFiles: Array<File>;
  campaignGoalSetting?: Maybe<Scalars['String']>;
  campaignGoals?: Maybe<Scalars['String']>;
  campaignParticipationPackages?: Maybe<Scalars['JSON']>;
  employeeCount: Scalars['Int'];
  id: Scalars['ID'];
  logoUrl?: Maybe<Scalars['String']>;
  micrositeSlug?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

export type CompanyAboutSection = {
  __typename?: 'CompanyAboutSection';
  heading?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type CompanyAction = {
  __typename?: 'CompanyAction';
  badge?: Maybe<ContentAsset>;
  companyId?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  dataId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  expiredAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier generated using the contentId and companyId */
  id: Scalars['ID'];
  plannedAt?: Maybe<Scalars['DateTime']>;
  requirements?: Maybe<Array<Maybe<CompanyActionRequirement>>>;
  title?: Maybe<Scalars['String']>;
};

export type CompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
};

export type CompanyActionRequirement = {
  __typename?: 'CompanyActionRequirement';
  companyActionContentId: Scalars['String'];
  companyActionDataId?: Maybe<Scalars['String']>;
  completedAt?: Maybe<Scalars['DateTime']>;
  contentId: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  dataId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  /** A unique identifier generated using the companyActionContentId, contentId and companyId */
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<ActionRequirementValue>>>;
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

export type CompanyQualificationStatus = {
  __typename?: 'CompanyQualificationStatus';
  achievementsStatus: Array<AchievementStatus>;
  availableMeasurementOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
  programId: Scalars['String'];
  programName: Scalars['String'];
  totalCompletedCompanyActionsCount: Scalars['Int'];
};

export type CompleteCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
};

export type CompleteCompanyActionRequirementInput = {
  actionContentId: Scalars['String'];
  actionRequirementContentId: Scalars['String'];
  isCompleted: Scalars['Boolean'];
  /** Some requirements have mandatory values to be provided on completion */
  values?: InputMaybe<Scalars['JSON']>;
};

export type ContentAsset = {
  __typename?: 'ContentAsset';
  id: Scalars['ID'];
  url?: Maybe<Scalars['String']>;
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
  email: Scalars['String'];
};

export type DeleteUserInput = {
  userId: Scalars['ID'];
};

export type File = {
  __typename?: 'File';
  name?: Maybe<Scalars['String']>;
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
  /** Allows admins to create new users */
  createUser: User;
  createUserInvite: UserInvite;
  deleteUser: User;
  planCompanyAction: CompanyAction;
  processCompanyActionExpiry: Scalars['Boolean'];
  /** Allows users to register if they have been invited */
  registerUser: User;
  requestPasswordReset: Scalars['Boolean'];
  updateUser: User;
};


export type MutationCompleteCompanyActionArgs = {
  input: CompleteCompanyActionInput;
};


export type MutationCompleteCompanyActionRequirementArgs = {
  input: CompleteCompanyActionRequirementInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserInviteArgs = {
  input: CreateUserInviteInput;
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


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type PlanCompanyActionInput = {
  /** The ID for that action in contentful */
  actionContentId: Scalars['String'];
  isPlanned: Scalars['Boolean'];
};

export type QualifiedCompaniesInput = {
  filter?: InputMaybe<QualifiedCompaniesInputFilter>;
};

export type QualifiedCompaniesInputFilter = {
  achievementContentIds?: InputMaybe<Array<Scalars['String']>>;
  companyIds?: InputMaybe<Array<Scalars['String']>>;
  companyMicrositeSlugs?: InputMaybe<Array<Scalars['String']>>;
};

export type QualifiedCompanyItem = {
  __typename?: 'QualifiedCompanyItem';
  company: Company;
  completedCompanyActions: Array<CompanyAction>;
  programId: Scalars['String'];
  programName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['Boolean']>;
  achievementFunnelStats: AchievementFunnelStats;
  actionStats: Array<ActionStats>;
  companiesTakingAction: Array<ComaniesTakingActionResultItem>;
  companyAction: CompanyAction;
  companyImpact: CompanyImpactResult;
  companyQualification: CompanyQualificationStatus;
  completedCompanyActions: Array<Maybe<CompanyAction>>;
  plannedCompanyActions: Array<Maybe<CompanyAction>>;
  qualifiedCompanies: Array<QualifiedCompanyItem>;
  searchUser: Array<User>;
  user: User;
  userInvites: Array<UserInvite>;
  users: UsersResult;
};


export type QueryAchievementFunnelStatsArgs = {
  input: AchievementFunnelStatsInput;
};


export type QueryActionStatsArgs = {
  input: ActionStatsInput;
};


export type QueryCompaniesTakingActionArgs = {
  input?: InputMaybe<CompaniesTakingActionInput>;
};


export type QueryCompanyActionArgs = {
  input: CompanyActionInput;
};


export type QueryCompanyImpactArgs = {
  input?: InputMaybe<CompanyImpactInput>;
};


export type QueryQualifiedCompaniesArgs = {
  input?: InputMaybe<QualifiedCompaniesInput>;
};


export type QuerySearchUserArgs = {
  input: SearchUserInput;
};


export type QueryUserArgs = {
  input?: InputMaybe<UserInput>;
};


export type QueryUsersArgs = {
  input?: InputMaybe<UsersInput>;
};

export type RegisterUserInput = {
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  inviteId: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type RequestPasswordResetInput = {
  email: Scalars['String'];
};

export type RequirementContentInput = {
  id: Scalars['String'];
};

export type RequirementsContentInput = {
  ids: Array<Scalars['String']>;
};

export type SearchUserInput = {
  query: Scalars['String'];
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

export type UserFragmentFragment = { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null };

export type UserQueryVariables = Exact<{
  input?: InputMaybe<UserInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', companyId?: string | null, country: string, email: string, firstName: string, id: string, lastName: string, phone?: string | null, picture?: string | null, roles: Array<string>, sortWeight?: number | null } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
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
export const UserDocument = gql`
    query user($input: UserInput) {
  user(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};