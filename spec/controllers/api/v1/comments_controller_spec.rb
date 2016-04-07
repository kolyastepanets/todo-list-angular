require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
  let(:user) { create(:user) }
  let!(:project) { create(:project) }
  let!(:task) { create(:task, project: project) }
  let!(:comment) { create(:comment, task: task) }

  before { allow(controller).to receive(:current_user).and_return(user) }

  sign_in_user
  ability

  describe "POST #create" do
    context 'saves comment' do
      it 'saves new comment' do
        post :create, task_id: task, comment: attributes_for(:comment), format: :json
        expect(assigns(:comment)).to_not be_nil
      end
    end

    context "does not save comment" do
      it "forbids to create comment" do
        @ability.cannot :create, Comment
        post :create, task_id: task, comment: attributes_for(:comment), format: :json
        expect(response).to be_forbidden
      end

      it 'has invalid params' do
        expect{ post :create, task_id: task, comment:
                                attributes_for(:comment,
                                content: ''), format: :json }.to_not change(Comment, :count)
      end
    end
  end

  describe 'DELETE #destroy' do
    it 'forbids to destroy comment' do
      @ability.cannot :destroy, Comment
      delete :destroy, id: comment.id, format: :json
      expect(response).to be_forbidden
    end

    it 'deletes a task' do
      # byebug
      expect{ delete :destroy, format: :json, id: comment }.
        to change(Comment, :count).by(-1)
    end
  end
end
