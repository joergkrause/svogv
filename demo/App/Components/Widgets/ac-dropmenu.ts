`<li class="dropdown messages-menu">
                <!-- Menu toggle button -->
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <i class="fa fa-envelope-o"></i>
                    <span class="label label-success">{{ repositoriesCount }}</span>
                </a>
                <ul class="dropdown-menu">
                    <li class="header">You have {{ repositoriesCount }} repositories selected</li>
                    <li>
                        <!-- inner menu: contains the messages -->
                        <ul class="menu">
                            <li>
                                <!-- start message -->
                                <a href="#">
                                    <div class="pull-left">
                                        <!-- User Image -->
                                        <img src="/assets/img/Texxtoor-160x56.png" alt="texxtoor">
                                    </div>
                                    <!-- Message title and timestamp -->
                                    <h4>
                                        Owner
                                        <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                    </h4>
                                    <!-- The message -->
                                    <p>Learn more about queries?</p>
                                </a>
                            </li>
                            <!-- end message -->
                        </ul>
                        <!-- /.menu -->
                    </li>
                    <li class="footer"><a href="#" [routerLink]="['/repositories']">See All Repositories</a></li>
                </ul>
            </li>`