class AddAuthenticationTokentoUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :authentication_token, :string, unique: true
  end
end
