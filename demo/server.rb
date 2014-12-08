$:.unshift(__dir__)
require "bundler/setup"
require "sinatra"
require "beaneater"
require "job"

configure do
  enable :sessions

  $beanstalk = Beaneater::Pool.new(['localhost:11300'])
  $tube = $beanstalk.tubes["jobs"]
end

get "/" do
  @message = session.delete(:message)
  erb :index
end

post "/signup" do
  Job.async($tube, :send_welcome_email, params[:email])
  session[:message] = "Welcome email sent to #{params[:email]}"
  redirect to("/")
end

__END__
@@ layout
<!DOCTYPE html>
<html>
<%= yield %>
</html>

@@ index
<p><%= @message %></p>

<form method="post" action="/signup">
  <input type="text" name="email" placeholder="Email Address">
  <button type="submit">Signup</button>
</form>
