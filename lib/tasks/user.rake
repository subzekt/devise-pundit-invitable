namespace :user do
  desc "create users"
  task :new,[:role,:email,:password] => :environment do |task, args|
    unless args.role.blank? || args.email.blank? || args.password.blank? || !(%w(admin manager supervisor).include? args.role)
      user = User.find_or_create_by!(email: args.email) do |user|
        user.password = args.password
        user.password_confirmation = args.password
        user.confirm!
      end

      if args.role == 'admin'
        user.admin!
      elsif args.role == 'manager'
        user.manager!
      elsif args.role == 'supervisor'
        user.supervisor!
      end
      puts "#{args.role} user Created successfully"
    else
      puts "Please provide role, email and password"
    end
  end
end