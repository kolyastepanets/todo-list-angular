require 'rails_helper'

RSpec.describe Api::V1::ProjectsController, type: :controller do
  let(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:projects) { create_list(:project, 2, user: user) }

  before { allow(controller).to receive(:current_user).and_return(user) }

  sign_in_user
  ability

  describe 'GET #index' do
    before { get :index, format: :json }

    it "forbids to read projects" do
      @ability.cannot :index, Project
      get :index, format: :json
      expect(response).to be_forbidden
    end

    it 'should return successful response' do
      expect(response).to be_success
    end

    it 'assigns all projects as @projects' do
      expect(assigns(:projects)).to match_array(projects)
    end
  end

  describe "POST #create" do
    context 'saves project' do
      it 'saves new project' do
        post :create, project: attributes_for(:project), format: :json
        expect(assigns(:project)).to_not be_nil
      end

    end

    context "does not save project" do
      it "forbids to create project" do
        @ability.cannot :create, Project
        get :create, project: attributes_for(:project), format: :json
        expect(response).to be_forbidden
      end

      it 'has invalid params' do
        expect(controller).to receive(:current_ability).and_return(@ability)
        expect{ post :create, project:
                                attributes_for(:project,
                                name: ''), format: :json }.to_not change(Project, :count)
      end
    end
  end

  describe "PATCH #update" do
    context "updates project" do
      it "updates successfully" do
        patch :update, id: project.id, project: attributes_for(:project, name: "new name"), format: :json
        project.reload
        expect(assigns(:project)).to eq project
        expect(project.name).to eq "new name"
      end
    end

    context "does not update project" do
      it "forbids to update project" do
        @ability.cannot :update, Project
        patch :update, id: project.id, project: attributes_for(:project, name: "new name"), format: :json
        expect(response).to be_forbidden
      end

      it "does not updates with invalid params" do
        patch :update, id: project.id, project: attributes_for(:project, name: ""), format: :json
        project.reload
        expect(project.name).to eq project.name
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'forbids to destroy project' do
      @ability.cannot :destroy, Project
      delete :destroy, id: project.id, format: :json
      expect(response).to be_forbidden
    end

    it 'deletes a project' do
      expect{ delete :destroy, format: :json, id: project }.
        to change(Project, :count).by(-1)
    end
  end
end
