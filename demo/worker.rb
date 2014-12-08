$:.unshift(__dir__)
require "bundler/setup"
require "beaneater"
require "job"

@beanstalk = Beaneater::Pool.new(['localhost:11300'])
@tube = @beanstalk.tubes["jobs"]

while job = @tube.reserve
  begin
    Job.perform(job.body)
  rescue => e
    warn e
    job.bury
  end

  job.delete
end
