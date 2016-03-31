require 'rails_helper'

RSpec.describe Api::V1::TasksController, type: :controller do
  let(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:task) { create(:task, project: project) }

  before { allow(controller).to receive(:current_user).and_return(user) }

  sign_in_user
  ability

  describe "POST #create" do
    context 'saves task' do
      it 'saves new task' do
        post :create, project_id: project, task: attributes_for(:task), format: :json
        expect(assigns(:task)).to_not be_nil
      end
    end

    context "does not save task" do
      it "forbids to create task" do
        @ability.cannot :create, Task
        post :create, project_id: project, task: attributes_for(:task), format: :json
        expect(response).to be_forbidden
      end

      it 'has invalid params' do
        expect{ post :create, project_id: project, task:
                                attributes_for(:task, title: ''),
                                format: :json }.to_not change(Task, :count)
      end
    end
  end

  describe "PATCH #update" do
    context "updates task" do
      it "updates successfully" do
        patch :update, id: task.id, project_id: project, task: attributes_for(:task, title: "new name"), format: :json
        task.reload
        expect(task.title).to eq "new name"
      end
    end

    context "does not update task" do
      it "forbids to update task" do
        @ability.cannot :update, Task
        patch :update, id: task.id, project_id: project, task: attributes_for(:task, title: "new name"), format: :json
        expect(response).to be_forbidden
      end

      it "does not updates with invalid params" do
        patch :update, id: task.id, project_id: project, task: attributes_for(:task, title: ""), format: :json
        task.reload
        expect(task.title).to eq task.title
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'forbids to destroy task' do
      @ability.cannot :destroy, Task
      delete :destroy, id: task.id, project_id: project, format: :json
      expect(response).to be_forbidden
    end

    it 'deletes a task' do
      expect{ delete :destroy, format: :json, id: task, project_id: project }.
        to change(Task, :count).by(-1)
    end
  end
end
