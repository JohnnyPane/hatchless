import { useParams } from "react-router-dom";
import { Title, Text, Button, Modal, Tabs } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

import { ResourceProvider } from "../../contexts/ResourceContext.jsx";
import { useUpdateResource } from "../../hooks/useResourceMutations.js";
import { useMe } from "../../hooks/useMe.js";
import HatchlessGridInputs from "../ui/HatchlessGridInputs.jsx";
import UserAvatarDrawer from "./UserAvatarDrawer.jsx";
import UserAvatar from "./UserAvatar.jsx";
import PostList from "../posts/PostList.jsx";
import HatchReports from "../hatchReports/HatchReports.jsx";

const userInputs = [
  { name: "first_name", label: "First Name", placeholder: "Enter first name", type: "text", span: 6, required: true },
  { name: "last_name", label: "Last Name", placeholder: "Enter last name", type: "text", span: 6, required: true },
  { name: "email", label: "Email", placeholder: "Enter email address", type: "email", span: 12, disabled: true },
];

const User = () => {
  const { data: me, isLoading } = useMe();
  const { id } = useParams();
  const [editMode, { toggle: toggleEditMode }] = useDisclosure(false);
  const [addAvatar, { open: openAddAvatar, close: closeAddAvatar }] = useDisclosure(false);

  const updateUser = useUpdateResource('users', me?.id);
  const isMe = me?.id.toString() === id;

  const form = useForm({
    initialValues: {
      first_name: me?.first_name || "",
      last_name: me?.last_name || "",
      email: me?.email || "",
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async () => {
    const payload = {
      first_name: form.values.first_name,
      last_name: form.values.last_name
    }
    try {
      await updateUser.mutateAsync(payload);
      notifications.show({
        title: 'Success',
        message: 'User information updated successfully',
        color: 'green',
      });
      toggleEditMode();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update user information',
        color: 'red',
      });
    }
  };

  return (
    <div className="page">
      <div className="flex row space-between margin-bottom">
        <div className="flex row to-center align-center">
          <UserAvatar avatarUrl={me.avatar_url} size={150} />

          <div className="margin-left">
            <Title order={2}>{me.name}</Title>
            <Text size="lg" color="dimmed">{me.email}</Text>

            {isMe && <div className="margin-4-t">
              <Button onClick={toggleEditMode} color="blue" className="margin-right">
                Edit Information
              </Button>

              <Button onClick={openAddAvatar} color="blue" variant="light">
                Update Profile Picture
              </Button>
            </div>}
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="posts"><Text size="lg" className="bold">Posts</Text></Tabs.Tab>
          <Tabs.Tab value="hatch_reports"><Text size="lg" className="bold">Hatch Reports</Text></Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="posts" pt="xs">
          <div className="flex row to-center margin-top page">
            <ResourceProvider resourceName="posts" initialParams={{ scopes: [{ name: 'for_user', args: [me.id] }] }}>
              <PostList />
            </ResourceProvider>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="hatch_reports" pt="xs">
          <div className="margin-top" style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
            <ResourceProvider resourceName="hatch_reports" initialParams={{ scopes: [{ name: 'for_user', args: [me.id] }] }}>
              <HatchReports />
            </ResourceProvider>
          </div>
        </Tabs.Panel>
      </Tabs>


      <UserAvatarDrawer opened={addAvatar} onClose={closeAddAvatar} />

      <Modal opened={editMode} onClose={toggleEditMode} title={<Text className="bold" size="lg">Edit User Information</Text>} >
        <HatchlessGridInputs inputs={userInputs} form={form} />
        <Button className="margin-top full-width" onClick={handleSubmit}>Save Changes</Button>
      </Modal>
    </div>
  );
}

export default User;