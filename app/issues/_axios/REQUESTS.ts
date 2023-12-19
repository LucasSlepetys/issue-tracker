import { Issue, Status } from "@prisma/client";
import axios from "axios";

interface IssueResponse {
  issue: Issue | null;
  error: string | null;
}

export const GET_ISSUE = async (id: string): Promise<IssueResponse> => {
  try {
    const response = await axios.get(`http://localhost:3000/api/issues/${id}`);
    const issue: Issue = response.data.issue;
    return { issue, error: null };
  } catch (error) {
    return { issue: null, error: `There has been an error: ${error}` };
  }
};

interface IssuesResponse {
  issues: Issue[] | null;
  error: string | null;
}

export interface Params {
  status?: Status | 'all';
  order?: 'asc' | 'desc';
  orderBy?: 'title' | 'createdAt';
}

export const GET_ISSUES = async (params?: Params): Promise<IssuesResponse> => {
  try {
    const { status, order, orderBy } = params || {};
    const queryParams = new URLSearchParams();
    if (status) queryParams.append('status', status === 'all' ? '' : status);
    if (order) queryParams.append('order', order);
    if (orderBy) queryParams.append('orderBy', orderBy);

    const url = `http://localhost:3000/api/issues${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await axios.get(url);
    const issues: Issue[] = response.data.issues;
    return { issues, error: null };
  } catch (error) {
    return { issues: null, error: `There has been an error: ${error}` };
  }
};

interface DeleteIssueResponse {
  issue: Issue | null;
  error: string | null;
}

export const DEL_ISSUE = async (id: number): Promise<DeleteIssueResponse> => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/issues/${id}`);
    const issue: Issue = response.data.issue;
    return { issue, error: null };
  } catch (error) {
    return { issue: null, error: `There has been an error: ${error}` };
    
  }
}
