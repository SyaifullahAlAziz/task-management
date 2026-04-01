      <!-- partial:admin/partials/_sidebar.html -->
      <nav class="sidebar sidebar-offcanvas" id="sidebar">
          <ul class="nav">
              <li class="nav-item">
                  <a class="nav-link" href="{{ route('home') }}">
                      <i class="typcn typcn-device-desktop menu-icon"></i>
                      <span class="menu-title">Dashboard</span>
                      {{-- <div class="badge badge-danger">new</div> --}}
                  </a>
              </li>

              <li class="nav-item">
                  <a class="nav-link" href="{{ route('task.index') }}">
                      <i class="typcn typcn-document-text menu-icon"></i>
                      <span class="menu-title">Task</span>
                      {{-- <div class="badge badge-danger">new</div> --}}
                  </a>
              </li>

              {{-- <li class="nav-item">
                  <a class="nav-link" data-toggle="collapse" href="#ui-basic3" aria-expanded="false"
                      aria-controls="ui-basic3">
                      <i class="fa fa-users menu-icon"></i>
                      <span class="menu-title">User</span>
                      <i class="menu-arrow"></i>
                  </a>
                  <div class="collapse" id="ui-basic3">
                      <ul class="nav flex-column sub-menu">
                          <li class="nav-item"> <a class="nav-link" href="{{ route('user.index') }}">Data User</a></li>
                      </ul>
                  </div>
              </li> --}}

              <li class="nav-item">
                  <a onclick="return confirm('Yakin Ingin Logout?')" class="nav-link" href="{{ route('logout') }}">
                      <i class="fa fa-sign-out menu-icon"></i>
                      <span class="menu-title">Logout</span>
                  </a>
              </li>
          </ul>
      </nav>
      <!-- partial -->
      <div class="main-panel">
