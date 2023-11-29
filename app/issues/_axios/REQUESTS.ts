import { Issue } from "@prisma/client";
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

export const GET_ISSUES = async (): Promise<IssuesResponse> => {
  try {
    const response = await axios.get('http://localhost:3000/api/issues');
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
