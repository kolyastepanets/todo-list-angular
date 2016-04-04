require 'rails_helper'

feature 'create attachment', %q{
  i want to be able to add files to comment
} do

  given(:user) { create(:user) }
  given(:project) { create(:project, user: user) }
  given(:task) { create(:task, project: project) }
  given!(:comment) { create(:comment, task: task) }

  scenario 'create attachment', js: true do
    sign_in(user)
    find("#task-title-#{task.id}").hover
    find("#task-edit-btn-#{task.id}").click
    find(".add-file-link").click
    attach_file 'file', "#{Rails.root}/spec/spec_helper.rb"
    click_on "Upload file"

    expect(page).to have_content "File successfully uploaded!"
  end

end
