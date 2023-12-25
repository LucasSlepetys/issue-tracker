'use client';
import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeUser = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const updateAssignee = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId === 'null' ? null : userId,
      })
      .catch(() => toast('Changes could not be saved.'));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'null'}
        onValueChange={updateAssignee}
      >
        <Select.Trigger placeholder='Assign User...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Users</Select.Label>
            <Select.Item value='null'>Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
      axios
        .get(process.env.NEXTAUTH_URL + '/api/users')
        .then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeUser;
